'''
Business: API для онлайн-чата с менеджером (создание сессий, отправка сообщений)
Args: event - dict с httpMethod, body, queryStringParameters
      context - объект с request_id
Returns: HTTP response с данными чата или результатом операции
'''

import json
import os
import uuid
from typing import Dict, Any
from datetime import datetime, timedelta
import requests

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Session-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    import psycopg2
    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()
    
    try:
        if method == 'POST':
            body = json.loads(event.get('body', '{}'))
            action = body.get('action', 'create_session')
            
            if action == 'create_session':
                session_id = str(uuid.uuid4())
                user_name = body.get('user_name', 'Гость')
                user_email = body.get('user_email', '')
                
                cur.execute(
                    "INSERT INTO chat_sessions (session_id, user_name, user_email, status) "
                    "VALUES (%s, %s, %s, 'active') RETURNING id",
                    (session_id, user_name, user_email)
                )
                
                conn.commit()
                
                return {
                    'statusCode': 201,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'success': True,
                        'session_id': session_id,
                        'message': 'Chat session created'
                    })
                }
            
            elif action == 'send_message':
                session_id = body.get('session_id')
                sender_type = body.get('sender_type', 'user')
                sender_name = body.get('sender_name', 'Гость')
                message = body.get('message', '')
                
                if not session_id or not message:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'success': False, 'error': 'Session ID and message required'})
                    }
                
                cur.execute(
                    "INSERT INTO chat_messages (session_id, sender_type, sender_name, message) "
                    "VALUES (%s, %s, %s, %s) RETURNING id, created_at",
                    (session_id, sender_type, sender_name, message)
                )
                
                result = cur.fetchone()
                message_id = result[0]
                created_at = result[1]
                
                conn.commit()
                
                ai_message = None
                
                if sender_type == 'user':
                    cur.execute(
                        "SELECT created_at FROM chat_messages "
                        "WHERE session_id = %s AND sender_type = 'manager' AND sender_name NOT LIKE '%%ИИ%%' "
                        "ORDER BY created_at DESC LIMIT 1",
                        (session_id,)
                    )
                    
                    last_manager = cur.fetchone()
                    managers_offline = True
                    
                    if last_manager:
                        time_diff = datetime.now() - last_manager[0]
                        if time_diff < timedelta(minutes=5):
                            managers_offline = False
                    
                    if managers_offline:
                        cur.execute(
                            "SELECT message, sender_type, sender_name "
                            "FROM chat_messages WHERE session_id = %s "
                            "ORDER BY created_at DESC LIMIT 8",
                            (session_id,)
                        )
                        
                        history = cur.fetchall()
                        context = ""
                        for msg, s_type, s_name in reversed(history):
                            role = "Клиент" if s_type == "user" else "Менеджер"
                            context += f"{role}: {msg}\n"
                        
                        system_prompt = """Ты - ИИ помощник туристического агентства "Горящие Туры".
Мы продаем туры в: Турцию, ОАЭ, Таиланд, Египет, Мальдивы, Вьетнам, Шри-Ланку, Индонезию, Марокко, Грецию, Испанию.
Цены: 35,000₽ - 210,000₽. Все отели 5*.

Правила:
1. Отвечай КРАТКО (1-2 предложения)
2. Если не знаешь точно - скажи что менеджер уточнит
3. Предлагай оставить контакты
4. НЕ называй конкретные даты и цены
5. Используй 1 эмодзи на сообщение

Ответь на последнее сообщение."""
                        
                        grok_key = os.environ.get('GSK_WJYJQNVWKDCFU5GXZDRLWGDYB3FYSSQ2ZUGWIXSIGXY8WSZ8NVJP')
                        
                        try:
                            resp = requests.post(
                                'https://api.groq.com/openai/v1/chat/completions',
                                headers={'Authorization': f'Bearer {grok_key}', 'Content-Type': 'application/json'},
                                json={
                                    'model': 'mixtral-8x7b-32768',
                                    'messages': [
                                        {'role': 'system', 'content': system_prompt},
                                        {'role': 'user', 'content': f"{context}\nОтветь кратко:"}
                                    ],
                                    'temperature': 0.7,
                                    'max_tokens': 150
                                },
                                timeout=8
                            )
                            
                            ai_message = resp.json()['choices'][0]['message']['content'].strip()
                            
                            cur.execute(
                                "INSERT INTO chat_messages (session_id, sender_type, sender_name, message) "
                                "VALUES (%s, %s, %s, %s)",
                                (session_id, 'manager', '🤖 ИИ Помощник', ai_message)
                            )
                            
                            conn.commit()
                        except:
                            pass
                
                response_data = {
                    'success': True,
                    'message_id': message_id,
                    'created_at': str(created_at)
                }
                
                if ai_message:
                    response_data['ai_responded'] = True
                    response_data['ai_message'] = ai_message
                
                return {
                    'statusCode': 201,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps(response_data)
                }
        
        elif method == 'GET':
            params = event.get('queryStringParameters') or {}
            action = params.get('action', 'get_messages')
            
            if action == 'get_messages':
                session_id = params.get('session_id')
                
                if not session_id:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'success': False, 'error': 'Session ID required'})
                    }
                
                cur.execute(
                    "SELECT id, sender_type, sender_name, message, created_at "
                    "FROM chat_messages WHERE session_id = %s ORDER BY created_at ASC",
                    (session_id,)
                )
                
                messages = cur.fetchall()
                
                messages_list = []
                for msg in messages:
                    messages_list.append({
                        'id': msg[0],
                        'sender_type': msg[1],
                        'sender_name': msg[2],
                        'message': msg[3],
                        'created_at': str(msg[4])
                    })
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'success': True,
                        'messages': messages_list,
                        'count': len(messages_list)
                    })
                }
            
            elif action == 'get_sessions':
                status = params.get('status', 'active')
                
                cur.execute(
                    "SELECT session_id, user_name, user_email, status, created_at, "
                    "(SELECT COUNT(*) FROM chat_messages WHERE chat_messages.session_id = chat_sessions.session_id) as message_count "
                    "FROM chat_sessions WHERE status = %s ORDER BY created_at DESC",
                    (status,)
                )
                
                sessions = cur.fetchall()
                
                sessions_list = []
                for session in sessions:
                    sessions_list.append({
                        'session_id': session[0],
                        'user_name': session[1],
                        'user_email': session[2],
                        'status': session[3],
                        'created_at': str(session[4]),
                        'message_count': session[5]
                    })
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'success': True,
                        'sessions': sessions_list,
                        'count': len(sessions_list)
                    })
                }
            
            elif action == 'get_all_sessions':
                cur.execute(
                    "SELECT s.session_id, s.user_name, s.user_email, s.status, s.created_at, "
                    "(SELECT COUNT(*) FROM chat_messages WHERE chat_messages.session_id = s.session_id) as message_count, "
                    "(SELECT MAX(created_at) FROM chat_messages WHERE chat_messages.session_id = s.session_id) as last_message_at "
                    "FROM chat_sessions s ORDER BY last_message_at DESC NULLS LAST"
                )
                
                sessions = cur.fetchall()
                
                sessions_list = []
                for session in sessions:
                    sessions_list.append({
                        'session_id': session[0],
                        'user_name': session[1],
                        'user_email': session[2],
                        'status': session[3],
                        'created_at': str(session[4]),
                        'message_count': session[5],
                        'last_message_at': str(session[6]) if session[6] else None
                    })
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'success': True,
                        'sessions': sessions_list,
                        'count': len(sessions_list)
                    })
                }
        
        elif method == 'PUT':
            body = json.loads(event.get('body', '{}'))
            session_id = body.get('session_id')
            action = body.get('action')
            
            if not session_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'success': False, 'error': 'Session ID required'})
                }
            
            if action == 'close':
                cur.execute(
                    "UPDATE chat_sessions SET status = 'closed', closed_at = CURRENT_TIMESTAMP WHERE session_id = %s",
                    (session_id,)
                )
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'success': True, 'message': 'Session closed'})
                }
        
    except Exception as e:
        conn.rollback()
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'success': False, 'error': str(e)})
        }
    
    finally:
        cur.close()
        conn.close()
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'})
    }