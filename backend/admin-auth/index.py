import json
import os
import random
import string
from typing import Dict, Any
import jwt
from datetime import datetime, timedelta

# Временное хранилище кодов 2FA (в production использовать Redis)
_2fa_codes = {}

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Безопасная авторизация админов и менеджеров с JWT токенами
    Args: event dict с httpMethod и body, context object с request_id
    Returns: HTTP response dict с токеном или ошибкой
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        password = body_data.get('password', '')
        action = body_data.get('action', 'login')
        
        admin_password = os.environ.get('ADMIN_PASSWORD', 'admin2025')
        manager_password = os.environ.get('MANAGER_PASSWORD', 'manager2025')
        jwt_secret = os.environ.get('JWT_SECRET', 'demo-secret-key-change-me')
        
        if not admin_password or not manager_password:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({'success': False, 'error': 'Пароли не настроены. Добавьте ADMIN_PASSWORD и MANAGER_PASSWORD в секреты'})
            }
        
        if action == 'login':
            role = ''
            
            if password == admin_password:
                role = 'admin'
            elif password == manager_password:
                role = 'manager'
            
            if not role:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'isBase64Encoded': False,
                    'body': json.dumps({'success': False, 'error': 'Неверный пароль'})
                }
            
            token = jwt.encode(
                {'role': role, 'timestamp': datetime.now().timestamp(), 'exp': datetime.now() + timedelta(hours=24)},
                jwt_secret,
                algorithm='HS256'
            )
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({'success': True, 'token': token, 'role': role, 'expiresIn': 86400})
            }
        
        if action == 'verify':
            token = body_data.get('token', password)
            try:
                decoded = jwt.decode(token, jwt_secret, algorithms=['HS256'])
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'isBase64Encoded': False,
                    'body': json.dumps({'success': True, 'valid': True, 'role': decoded.get('role')})
                }
            except:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'isBase64Encoded': False,
                    'body': json.dumps({'success': False, 'valid': False})
                }
        
        if action == 'generate_2fa_code':
            email = body_data.get('email', '')
            if not email:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'isBase64Encoded': False,
                    'body': json.dumps({'success': False, 'error': 'Email required'})
                }
            
            code = ''.join(random.choices(string.digits, k=6))
            _2fa_codes[email] = {'code': code, 'expires': datetime.now() + timedelta(minutes=10)}
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({
                    'success': True, 
                    'message': 'Code sent',
                    'code': code  # В production отправлять на email, не возвращать в ответе
                })
            }
        
        if action == 'verify_2fa_code':
            email = body_data.get('email', '')
            code = body_data.get('code', '')
            
            if email not in _2fa_codes:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'isBase64Encoded': False,
                    'body': json.dumps({'success': False, 'error': 'Invalid or expired code'})
                }
            
            stored = _2fa_codes[email]
            
            if datetime.now() > stored['expires']:
                del _2fa_codes[email]
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'isBase64Encoded': False,
                    'body': json.dumps({'success': False, 'error': 'Code expired'})
                }
            
            if stored['code'] != code:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'isBase64Encoded': False,
                    'body': json.dumps({'success': False, 'error': 'Invalid code'})
                }
            
            del _2fa_codes[email]
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({'success': True, 'message': 'Code verified'})
            }
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'isBase64Encoded': False,
        'body': json.dumps({'error': 'Method not allowed'})
    }