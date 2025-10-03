import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Saves client booking requests to database
    Args: event - dict with httpMethod, body (booking data)
          context - object with request_id attribute
    Returns: HTTP response with booking confirmation
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
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Database configuration missing'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    tour_title = body_data.get('tourTitle')
    hotel = body_data.get('hotel')
    duration = body_data.get('duration')
    dates = body_data.get('dates')
    price = body_data.get('price')
    client_name = body_data.get('clientName')
    client_email = body_data.get('clientEmail')
    client_phone = body_data.get('clientPhone')
    adults = body_data.get('adults', 1)
    children = body_data.get('children', 0)
    comment = body_data.get('comment', '')
    
    if not all([tour_title, hotel, duration, dates, price, client_name, client_email, client_phone]):
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Missing required fields'})
        }
    
    conn = psycopg2.connect(database_url)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    cursor.execute(
        """
        INSERT INTO bookings 
        (tour_title, hotel, duration, dates, price, client_name, client_email, 
         client_phone, adults, children, comment, status)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        RETURNING id, created_at
        """,
        (tour_title, hotel, duration, dates, price, client_name, client_email,
         client_phone, adults, children, comment, 'new')
    )
    
    result = cursor.fetchone()
    conn.commit()
    cursor.close()
    conn.close()
    
    return {
        'statusCode': 201,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({
            'success': True,
            'bookingId': result['id'],
            'createdAt': result['created_at'].isoformat(),
            'message': 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.'
        })
    }
