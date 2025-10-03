import json
import os
from typing import Dict, Any
import jwt
from datetime import datetime, timedelta

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
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        password = body_data.get('password', '')
        action = body_data.get('action', 'login')
        
        admin_password = os.environ.get('ADMIN_PASSWORD', '')
        manager_password = os.environ.get('MANAGER_PASSWORD', '')
        jwt_secret = os.environ.get('JWT_SECRET', '')
        
        if not jwt_secret:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': False, 'error': 'JWT_SECRET не настроен'})
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
                'body': json.dumps({'success': True, 'token': token, 'role': role, 'expiresIn': 86400})
            }
        
        if action == 'verify':
            token = body_data.get('token', password)
            try:
                decoded = jwt.decode(token, jwt_secret, algorithms=['HS256'])
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'success': True, 'valid': True, 'role': decoded.get('role')})
                }
            except:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'success': False, 'valid': False})
                }
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'})
    }