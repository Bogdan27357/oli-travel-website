'''
Business: API для управления отзывами (CRUD + модерация)
Args: event - dict с httpMethod, body, queryStringParameters
      context - объект с request_id
Returns: HTTP response с данными отзывов или результатом операции
'''

import json
import os
from typing import Dict, Any

def handler(event: Dict, Any], context: Any) -> Dict[str, Any]:
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
            review_id = params.get('id')
            is_approved = params.get('is_approved')
            
            if review_id:
                cur.execute(
                    "SELECT id, author_name, author_avatar, country, rating, comment, date, "
                    "is_approved, created_at FROM reviews WHERE id = %s",
                    (review_id,)
                )
                review = cur.fetchone()
                
                if review:
                    review_data = {
                        'id': review[0],
                        'author_name': review[1],
                        'author_avatar': review[2],
                        'country': review[3],
                        'rating': review[4],
                        'comment': review[5],
                        'date': review[6],
                        'is_approved': review[7],
                        'created_at': str(review[8])
                    }
                    
                    return {
                        'statusCode': 200,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'success': True, 'review': review_data})
                    }
                else:
                    return {
                        'statusCode': 404,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'success': False, 'error': 'Review not found'})
                    }
            
            query = "SELECT id, author_name, author_avatar, country, rating, comment, date, " \
                    "is_approved, created_at FROM reviews WHERE 1=1"
            
            query_params = []
            
            if is_approved is not None:
                query += " AND is_approved = %s"
                query_params.append(is_approved.lower() == 'true')
            
            query += " ORDER BY created_at DESC"
            
            cur.execute(query, tuple(query_params))
            reviews = cur.fetchall()
            
            reviews_list = []
            for review in reviews:
                reviews_list.append({
                    'id': review[0],
                    'author_name': review[1],
                    'author_avatar': review[2],
                    'country': review[3],
                    'rating': review[4],
                    'comment': review[5],
                    'date': review[6],
                    'is_approved': review[7],
                    'created_at': str(review[8])
                })
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True, 'reviews': reviews_list, 'count': len(reviews_list)})
            }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            cur.execute(
                "INSERT INTO reviews (author_name, author_avatar, country, rating, comment, date, is_approved) "
                "VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id",
                (
                    body.get('author_name'),
                    body.get('author_avatar', ''),
                    body.get('country'),
                    body.get('rating'),
                    body.get('comment'),
                    body.get('date'),
                    body.get('is_approved', False)
                )
            )
            
            review_id = cur.fetchone()[0]
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True, 'id': review_id, 'message': 'Review created successfully'})
            }
        
        elif method == 'PUT':
            body = json.loads(event.get('body', '{}'))
            review_id = body.get('id')
            
            if not review_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'success': False, 'error': 'Review ID required'})
                }
            
            action = body.get('action')
            
            if action == 'approve':
                cur.execute("UPDATE reviews SET is_approved = true WHERE id = %s", (review_id,))
            elif action == 'reject':
                cur.execute("UPDATE reviews SET is_approved = false WHERE id = %s", (review_id,))
            else:
                cur.execute(
                    "UPDATE reviews SET author_name=%s, author_avatar=%s, country=%s, rating=%s, "
                    "comment=%s, date=%s, is_approved=%s WHERE id=%s",
                    (
                        body.get('author_name'),
                        body.get('author_avatar'),
                        body.get('country'),
                        body.get('rating'),
                        body.get('comment'),
                        body.get('date'),
                        body.get('is_approved'),
                        review_id
                    )
                )
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True, 'message': 'Review updated successfully'})
            }
        
        elif method == 'DELETE':
            params = event.get('queryStringParameters') or {}
            review_id = params.get('id')
            
            if not review_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'success': False, 'error': 'Review ID required'})
                }
            
            cur.execute("DELETE FROM reviews WHERE id = %s", (review_id,))
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True, 'message': 'Review deleted successfully'})
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
