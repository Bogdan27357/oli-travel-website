'''
Business: Admin authentication with JWT tokens
Args: event with httpMethod, body (password, action); context with request_id
Returns: HTTP response with JWT token on success
'''

import json
import os
from typing import Dict, Any
import jwt
from datetime import datetime, timedelta

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        password = body_data.get('password', '')
        action = body_data.get('action', 'login')
        
        admin_password = os.environ.get('ADMIN_PASSWORD')
        jwt_secret = os.environ.get('JWT_SECRET')
        
        if not admin_password or not jwt_secret:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({
                    'success': False,
                    'error': 'Server configuration error'
                })
            }
        
        if action == 'login':
            if password != admin_password:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'isBase64Encoded': False,
                    'body': json.dumps({
                        'success': False,
                        'error': 'Неверный пароль'
                    })
                }
            
            token = jwt.encode(
                {
                    'role': 'admin',
                    'timestamp': datetime.now().timestamp(),
                    'exp': datetime.now() + timedelta(hours=24)
                },
                jwt_secret,
                algorithm='HS256'
            )
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({
                    'success': True,
                    'token': token,
                    'expiresIn': 86400
                })
            }
        
        if action == 'verify':
            token = password
            
            try:
                jwt.decode(token, jwt_secret, algorithms=['HS256'])
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'isBase64Encoded': False,
                    'body': json.dumps({
                        'success': True,
                        'valid': True
                    })
                }
            except:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'isBase64Encoded': False,
                    'body': json.dumps({
                        'success': False,
                        'valid': False,
                        'error': 'Token expired or invalid'
                    })
                }
        
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({
                'success': False,
                'error': 'Invalid action'
            })
        }
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'isBase64Encoded': False,
        'body': json.dumps({'error': 'Method not allowed'})
    }
