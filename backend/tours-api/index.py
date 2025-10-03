'''
Business: API для управления турами (CRUD операции)
Args: event - dict с httpMethod, body, queryStringParameters
      context - объект с request_id
Returns: HTTP response с данными туров или результатом операции
'''

import json
import os
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    import psycopg2
    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()
    
    try:
        if method == 'GET':
            params = event.get('queryStringParameters') or {}
            tour_id = params.get('id')
            country = params.get('country')
            is_hot = params.get('is_hot')
            is_active = params.get('is_active', 'true')
            
            if tour_id:
                cur.execute(
                    "SELECT id, title, country, city, hotel, stars, dates, duration, price, old_price, "
                    "image_url, description, includes, flight_included, is_hot, is_active, "
                    "created_at, updated_at FROM tours WHERE id = %s",
                    (tour_id,)
                )
                tour = cur.fetchone()
                
                if tour:
                    tour_data = {
                        'id': tour[0],
                        'title': tour[1],
                        'country': tour[2],
                        'city': tour[3],
                        'hotel': tour[4],
                        'stars': tour[5],
                        'dates': tour[6],
                        'duration': tour[7],
                        'price': tour[8],
                        'old_price': tour[9],
                        'image_url': tour[10],
                        'description': tour[11],
                        'includes': tour[12],
                        'flight_included': tour[13],
                        'is_hot': tour[14],
                        'is_active': tour[15],
                        'created_at': str(tour[16]),
                        'updated_at': str(tour[17])
                    }
                    
                    return {
                        'statusCode': 200,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'success': True, 'tour': tour_data})
                    }
                else:
                    return {
                        'statusCode': 404,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'success': False, 'error': 'Tour not found'})
                    }
            
            query = "SELECT id, title, country, city, hotel, stars, dates, duration, price, old_price, " \
                    "image_url, description, includes, flight_included, is_hot, is_active, " \
                    "created_at, updated_at FROM tours WHERE 1=1"
            
            query_params = []
            
            if country:
                query += " AND country = %s"
                query_params.append(country)
            
            if is_hot:
                query += " AND is_hot = %s"
                query_params.append(is_hot.lower() == 'true')
            
            if is_active:
                query += " AND is_active = %s"
                query_params.append(is_active.lower() == 'true')
            
            query += " ORDER BY created_at DESC"
            
            cur.execute(query, tuple(query_params))
            tours = cur.fetchall()
            
            tours_list = []
            for tour in tours:
                tours_list.append({
                    'id': tour[0],
                    'title': tour[1],
                    'country': tour[2],
                    'city': tour[3],
                    'hotel': tour[4],
                    'stars': tour[5],
                    'dates': tour[6],
                    'duration': tour[7],
                    'price': tour[8],
                    'old_price': tour[9],
                    'image_url': tour[10],
                    'description': tour[11],
                    'includes': tour[12],
                    'flight_included': tour[13],
                    'is_hot': tour[14],
                    'is_active': tour[15],
                    'created_at': str(tour[16]),
                    'updated_at': str(tour[17])
                })
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True, 'tours': tours_list, 'count': len(tours_list)})
            }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            cur.execute(
                "INSERT INTO tours (title, country, city, hotel, stars, dates, duration, price, old_price, "
                "image_url, description, includes, flight_included, is_hot, is_active) "
                "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id",
                (
                    body.get('title'),
                    body.get('country'),
                    body.get('city'),
                    body.get('hotel'),
                    body.get('stars'),
                    body.get('dates'),
                    body.get('duration'),
                    body.get('price'),
                    body.get('old_price'),
                    body.get('image_url'),
                    body.get('description'),
                    body.get('includes'),
                    body.get('flight_included', True),
                    body.get('is_hot', False),
                    body.get('is_active', True)
                )
            )
            
            tour_id = cur.fetchone()[0]
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True, 'id': tour_id, 'message': 'Tour created successfully'})
            }
        
        elif method == 'PUT':
            body = json.loads(event.get('body', '{}'))
            tour_id = body.get('id')
            
            if not tour_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'success': False, 'error': 'Tour ID required'})
                }
            
            cur.execute(
                "UPDATE tours SET title=%s, country=%s, city=%s, hotel=%s, stars=%s, dates=%s, "
                "duration=%s, price=%s, old_price=%s, image_url=%s, description=%s, includes=%s, "
                "flight_included=%s, is_hot=%s, is_active=%s, updated_at=CURRENT_TIMESTAMP "
                "WHERE id=%s",
                (
                    body.get('title'),
                    body.get('country'),
                    body.get('city'),
                    body.get('hotel'),
                    body.get('stars'),
                    body.get('dates'),
                    body.get('duration'),
                    body.get('price'),
                    body.get('old_price'),
                    body.get('image_url'),
                    body.get('description'),
                    body.get('includes'),
                    body.get('flight_included'),
                    body.get('is_hot'),
                    body.get('is_active'),
                    tour_id
                )
            )
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True, 'message': 'Tour updated successfully'})
            }
        
        elif method == 'DELETE':
            params = event.get('queryStringParameters') or {}
            tour_id = params.get('id')
            
            if not tour_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'success': False, 'error': 'Tour ID required'})
                }
            
            cur.execute("UPDATE tours SET is_active = false WHERE id = %s", (tour_id,))
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True, 'message': 'Tour deactivated successfully'})
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
