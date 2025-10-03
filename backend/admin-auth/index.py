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
    
    print(f"[AUTH] Request method: {method}")
    print(f"[AUTH] Headers: {event.get('headers', {})}")
    print(f"[AUTH] Body: {event.get('body', '')[:200]}")
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400',
                'Content-Type': 'text/plain'
            },
            'isBase64Encoded': False,
            'body': ''
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        password = body_data.get('password', '')
        action = body_data.get('action', 'login')
        
        admin_password = os.environ.get('ADMIN_PASSWORD', 'admin2025')
        manager_password = os.environ.get('MANAGER_PASSWORD', 'manager2025')
        jwt_secret = os.environ.get('JWT_SECRET', 'demo-secret-key-change-me')
        
        if action == 'login':
            print(f"[AUTH] Login attempt with password: {password[:3]}*** (len: {len(password)})")
            print(f"[AUTH] Admin password check: {admin_password[:3]}*** (len: {len(admin_password)})")
            print(f"[AUTH] Manager password check: {manager_password[:3]}*** (len: {len(manager_password)})")
            
            role = ''
            
            if password == admin_password:
                role = 'admin'
                print(f"[AUTH] ✅ Admin password matched!")
            elif password == manager_password:
                role = 'manager'
                print(f"[AUTH] ✅ Manager password matched!")
            else:
                print(f"[AUTH] ❌ No password matched")
            
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
        
        if action == 'change_password':
            token = body_data.get('token', '')
            new_password = body_data.get('new_password', '')
            role_to_change = body_data.get('role', 'admin')
            
            if not token or not new_password:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'isBase64Encoded': False,
                    'body': json.dumps({'success': False, 'error': 'Token and new password required'})
                }
            
            try:
                decoded = jwt.decode(token, jwt_secret, algorithms=['HS256'])
                user_role = decoded.get('role')
                
                if user_role != 'admin':
                    return {
                        'statusCode': 403,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'isBase64Encoded': False,
                        'body': json.dumps({'success': False, 'error': 'Only admin can change passwords'})
                    }
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'isBase64Encoded': False,
                    'body': json.dumps({
                        'success': True, 
                        'message': f'Password for {role_to_change} would be updated. Update the {role_to_change.upper()}_PASSWORD secret in project settings.',
                        'note': 'Passwords are stored as project secrets. Update them in poehali.dev secrets panel.'
                    })
                }
            except:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'isBase64Encoded': False,
                    'body': json.dumps({'success': False, 'error': 'Invalid token'})
                }
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'isBase64Encoded': False,
        'body': json.dumps({'error': 'Method not allowed'})
    }