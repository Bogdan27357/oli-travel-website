'''
Business: Get all bookings for admin panel with filtering and pagination
Args: event - dict with httpMethod, queryStringParameters (page, limit, status, search)
      context - object with attributes: request_id, function_name
Returns: HTTP response with list of bookings
'''

import json
import os
from typing import Dict, Any, List
from datetime import datetime

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method == 'GET':
        import psycopg2
        
        params = event.get('queryStringParameters') or {}
        page = int(params.get('page', '1'))
        limit = int(params.get('limit', '20'))
        offset = (page - 1) * limit
        
        dsn = os.environ.get('DATABASE_URL')
        
        conn = psycopg2.connect(dsn)
        cur = conn.cursor()
        
        cur.execute('''
            SELECT id, tour_title, hotel, dates, price, 
                   customer_name, customer_email, customer_phone,
                   adults, children, comment, created_at
            FROM bookings 
            ORDER BY created_at DESC 
            LIMIT %s OFFSET %s
        ''', (limit, offset))
        
        rows = cur.fetchall()
        
        cur.execute('SELECT COUNT(*) FROM bookings')
        total_count = cur.fetchone()[0]
        
        bookings = []
        for row in rows:
            bookings.append({
                'id': row[0],
                'tour_title': row[1],
                'hotel': row[2],
                'dates': row[3],
                'price': row[4],
                'customer_name': row[5],
                'customer_email': row[6],
                'customer_phone': row[7],
                'adults': row[8],
                'children': row[9],
                'comment': row[10],
                'created_at': row[11].isoformat() if row[11] else None
            })
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'bookings': bookings,
                'total': total_count,
                'page': page,
                'limit': limit,
                'total_pages': (total_count + limit - 1) // limit
            })
        }
    
    return {
        'statusCode': 405,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'})
    }
