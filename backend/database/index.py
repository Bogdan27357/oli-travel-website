import json
import os
from typing import Dict, Any
import psycopg2
import psycopg2.extras


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Business: Подключение к базе данных на Рег.ру для работы с заявками, турами и пользователями
    Args: event - dict с httpMethod, body, queryStringParameters
          context - объект с атрибутами: request_id, function_name
    Returns: HTTP response dict с данными из БД
    """
    method: str = event.get('httpMethod', 'GET')
    
    # CORS preflight
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    # Получаем данные подключения из секретов
    db_host = os.environ.get('REG_DB_HOST')
    db_port = os.environ.get('REG_DB_PORT', '5432')
    db_name = os.environ.get('REG_DB_NAME')
    db_user = os.environ.get('REG_DB_USER')
    db_pass = os.environ.get('REG_DB_PASS')
    
    # Проверка наличия всех параметров
    if not all([db_host, db_name, db_user, db_pass]):
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({
                'error': 'Database credentials not configured',
                'message': 'Настройте секреты для подключения к БД Рег.ру'
            })
        }
    
    try:
        # Подключение к PostgreSQL на Рег.ру
        conn = psycopg2.connect(
            host=db_host,
            port=int(db_port),
            database=db_name,
            user=db_user,
            password=db_pass,
            connect_timeout=10
        )
        
        cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        
        # GET - получение данных
        if method == 'GET':
            params = event.get('queryStringParameters', {})
            table = params.get('table', 'submissions')
            limit = int(params.get('limit', '100'))
            
            # Простой запрос SELECT (используем Simple Query Protocol)
            query = f"SELECT * FROM {table} ORDER BY created_at DESC LIMIT {limit}"
            cursor.execute(query)
            
            results = cursor.fetchall()
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({
                    'success': True,
                    'data': results,
                    'count': len(results)
                }, default=str)
            }
        
        # POST - создание записи
        if method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            table = body_data.get('table', 'submissions')
            data = body_data.get('data', {})
            
            # Формируем INSERT запрос
            columns = ', '.join(data.keys())
            values_placeholder = ', '.join([f"'{v}'" if isinstance(v, str) else str(v) for v in data.values()])
            
            query = f"INSERT INTO {table} ({columns}) VALUES ({values_placeholder}) RETURNING *"
            cursor.execute(query)
            
            result = cursor.fetchone()
            conn.commit()
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({
                    'success': True,
                    'data': result,
                    'message': 'Запись успешно создана'
                }, default=str)
            }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Method not allowed'})
        }
        
    except psycopg2.Error as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({
                'error': 'Database error',
                'message': str(e)
            })
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({
                'error': 'Internal server error',
                'message': str(e)
            })
        }
