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
from datetime import datetime

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
                
                return {
                    'statusCode': 201,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'success': True,
                        'message_id': message_id,
                        'created_at': str(created_at)
                    })
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