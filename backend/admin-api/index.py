'''
Business: Universal admin API for tours, reviews, and submissions management
Args: event with httpMethod, body, queryStringParameters, path; context with request_id
Returns: HTTP response with data or success status
'''

import json
import os
import psycopg2
from typing import Dict, Any
import jwt

def verify_admin_token(token: str) -> bool:
    try:
        jwt_secret = os.environ.get('JWT_SECRET')
        if not jwt_secret:
            return False
        jwt.decode(token, jwt_secret, algorithms=['HS256'])
        return True
    except:
        return False

def handle_submissions(method: str, event: Dict[str, Any], cursor, conn) -> Dict[str, Any]:
    if method == 'GET':
        params = event.get('queryStringParameters', {}) or {}
        status_filter = params.get('status', 'all')
        limit = int(params.get('limit', 100))
        offset = int(params.get('offset', 0))
        
        if status_filter != 'all':
            cursor.execute(
                "SELECT id, name, email, phone, message, status, created_at, updated_at "
                "FROM t_p56383043_oli_travel_website.contact_submissions "
                "WHERE status = %s ORDER BY created_at DESC LIMIT %s OFFSET %s",
                (status_filter, limit, offset)
            )
        else:
            cursor.execute(
                "SELECT id, name, email, phone, message, status, created_at, updated_at "
                "FROM t_p56383043_oli_travel_website.contact_submissions "
                "ORDER BY created_at DESC LIMIT %s OFFSET %s",
                (limit, offset)
            )
        
        rows = cursor.fetchall()
        submissions = []
        for row in rows:
            submissions.append({
                'id': row[0], 'name': row[1], 'email': row[2], 'phone': row[3],
                'message': row[4], 'status': row[5],
                'created_at': row[6].isoformat() if row[6] else None,
                'updated_at': row[7].isoformat() if row[7] else None
            })
        
        cursor.execute("SELECT COUNT(*) FROM t_p56383043_oli_travel_website.contact_submissions")
        total = cursor.fetchone()[0]
        
        return {'success': True, 'submissions': submissions, 'total': total}
    
    elif method == 'PUT':
        body_data = json.loads(event.get('body', '{}'))
        submission_id = body_data.get('id')
        new_status = body_data.get('status')
        
        cursor.execute(
            "UPDATE t_p56383043_oli_travel_website.contact_submissions "
            "SET status = %s, updated_at = CURRENT_TIMESTAMP WHERE id = %s",
            (new_status, submission_id)
        )
        conn.commit()
        return {'success': True, 'message': 'Status updated'}
    
    elif method == 'DELETE':
        params = event.get('queryStringParameters', {}) or {}
        submission_id = params.get('id')
        
        cursor.execute(
            "DELETE FROM t_p56383043_oli_travel_website.contact_submissions WHERE id = %s",
            (submission_id,)
        )
        conn.commit()
        return {'success': True, 'message': 'Submission deleted'}

def handle_tours(method: str, event: Dict[str, Any], cursor, conn) -> Dict[str, Any]:
    if method == 'GET':
        params = event.get('queryStringParameters', {}) or {}
        tour_id = params.get('id')
        
        if tour_id:
            cursor.execute(
                "SELECT id, country, city, hotel, stars, date_from, date_to, nights, people, "
                "flight, price, old_price, image_url, description, included, is_hot, is_active, "
                "created_at, updated_at FROM t_p56383043_oli_travel_website.tours WHERE id = %s",
                (tour_id,)
            )
            row = cursor.fetchone()
            if not row:
                return {'success': False, 'error': 'Tour not found'}
            
            tour = {
                'id': row[0], 'country': row[1], 'city': row[2], 'hotel': row[3],
                'stars': row[4], 'date_from': row[5].isoformat() if row[5] else None,
                'date_to': row[6].isoformat() if row[6] else None, 'nights': row[7],
                'people': row[8], 'flight': row[9], 'price': float(row[10]) if row[10] else 0,
                'old_price': float(row[11]) if row[11] else None,
                'image_url': row[12], 'description': row[13], 'included': row[14] or [],
                'is_hot': row[15], 'is_active': row[16],
                'created_at': row[17].isoformat() if row[17] else None,
                'updated_at': row[18].isoformat() if row[18] else None
            }
            return {'success': True, 'tour': tour}
        else:
            limit = int(params.get('limit', 100))
            offset = int(params.get('offset', 0))
            
            cursor.execute(
                "SELECT id, country, city, hotel, stars, date_from, date_to, nights, people, "
                "flight, price, old_price, image_url, description, included, is_hot, is_active, "
                "created_at, updated_at FROM t_p56383043_oli_travel_website.tours "
                "ORDER BY created_at DESC LIMIT %s OFFSET %s",
                (limit, offset)
            )
            rows = cursor.fetchall()
            
            tours = []
            for row in rows:
                tours.append({
                    'id': row[0], 'country': row[1], 'city': row[2], 'hotel': row[3],
                    'stars': row[4], 'date_from': row[5].isoformat() if row[5] else None,
                    'date_to': row[6].isoformat() if row[6] else None, 'nights': row[7],
                    'people': row[8], 'flight': row[9], 'price': float(row[10]) if row[10] else 0,
                    'old_price': float(row[11]) if row[11] else None,
                    'image_url': row[12], 'description': row[13], 'included': row[14] or [],
                    'is_hot': row[15], 'is_active': row[16],
                    'created_at': row[17].isoformat() if row[17] else None,
                    'updated_at': row[18].isoformat() if row[18] else None
                })
            
            cursor.execute("SELECT COUNT(*) FROM t_p56383043_oli_travel_website.tours")
            total = cursor.fetchone()[0]
            
            return {'success': True, 'tours': tours, 'total': total}
    
    elif method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        
        cursor.execute(
            "INSERT INTO t_p56383043_oli_travel_website.tours "
            "(country, city, hotel, stars, date_from, date_to, nights, people, flight, "
            "price, old_price, image_url, description, included, is_hot, is_active) "
            "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) "
            "RETURNING id",
            (
                body_data.get('country'), body_data.get('city'), body_data.get('hotel'),
                body_data.get('stars'), body_data.get('date_from'), body_data.get('date_to'),
                body_data.get('nights'), body_data.get('people'), body_data.get('flight', False),
                body_data.get('price'), body_data.get('old_price'), body_data.get('image_url'),
                body_data.get('description'), body_data.get('included', []),
                body_data.get('is_hot', False), body_data.get('is_active', True)
            )
        )
        new_id = cursor.fetchone()[0]
        conn.commit()
        return {'success': True, 'id': new_id, 'message': 'Tour created'}
    
    elif method == 'PUT':
        body_data = json.loads(event.get('body', '{}'))
        tour_id = body_data.get('id')
        
        cursor.execute(
            "UPDATE t_p56383043_oli_travel_website.tours SET "
            "country = %s, city = %s, hotel = %s, stars = %s, date_from = %s, date_to = %s, "
            "nights = %s, people = %s, flight = %s, price = %s, old_price = %s, "
            "image_url = %s, description = %s, included = %s, is_hot = %s, is_active = %s, "
            "updated_at = CURRENT_TIMESTAMP WHERE id = %s",
            (
                body_data.get('country'), body_data.get('city'), body_data.get('hotel'),
                body_data.get('stars'), body_data.get('date_from'), body_data.get('date_to'),
                body_data.get('nights'), body_data.get('people'), body_data.get('flight'),
                body_data.get('price'), body_data.get('old_price'), body_data.get('image_url'),
                body_data.get('description'), body_data.get('included', []),
                body_data.get('is_hot'), body_data.get('is_active'), tour_id
            )
        )
        conn.commit()
        return {'success': True, 'message': 'Tour updated'}
    
    elif method == 'DELETE':
        params = event.get('queryStringParameters', {}) or {}
        tour_id = params.get('id')
        
        cursor.execute("DELETE FROM t_p56383043_oli_travel_website.tours WHERE id = %s", (tour_id,))
        conn.commit()
        return {'success': True, 'message': 'Tour deleted'}

def handle_reviews(method: str, event: Dict[str, Any], cursor, conn) -> Dict[str, Any]:
    if method == 'GET':
        params = event.get('queryStringParameters', {}) or {}
        status_filter = params.get('status', 'all')
        limit = int(params.get('limit', 100))
        offset = int(params.get('offset', 0))
        
        if status_filter != 'all':
            cursor.execute(
                "SELECT id, name, tour_name, rating, comment, avatar_url, status, "
                "created_at, approved_at FROM t_p56383043_oli_travel_website.reviews "
                "WHERE status = %s ORDER BY created_at DESC LIMIT %s OFFSET %s",
                (status_filter, limit, offset)
            )
        else:
            cursor.execute(
                "SELECT id, name, tour_name, rating, comment, avatar_url, status, "
                "created_at, approved_at FROM t_p56383043_oli_travel_website.reviews "
                "ORDER BY created_at DESC LIMIT %s OFFSET %s",
                (limit, offset)
            )
        
        rows = cursor.fetchall()
        reviews = []
        for row in rows:
            reviews.append({
                'id': row[0], 'name': row[1], 'tour_name': row[2], 'rating': row[3],
                'comment': row[4], 'avatar_url': row[5], 'status': row[6],
                'created_at': row[7].isoformat() if row[7] else None,
                'approved_at': row[8].isoformat() if row[8] else None
            })
        
        cursor.execute("SELECT COUNT(*) FROM t_p56383043_oli_travel_website.reviews")
        total = cursor.fetchone()[0]
        
        cursor.execute(
            "SELECT COUNT(*) FROM t_p56383043_oli_travel_website.reviews WHERE status = 'pending'"
        )
        pending = cursor.fetchone()[0]
        
        return {'success': True, 'reviews': reviews, 'total': total, 'pending': pending}
    
    elif method == 'PUT':
        body_data = json.loads(event.get('body', '{}'))
        review_id = body_data.get('id')
        action = body_data.get('action')
        
        if action == 'approve':
            cursor.execute(
                "UPDATE t_p56383043_oli_travel_website.reviews "
                "SET status = 'approved', approved_at = CURRENT_TIMESTAMP WHERE id = %s",
                (review_id,)
            )
        elif action == 'reject':
            cursor.execute(
                "UPDATE t_p56383043_oli_travel_website.reviews SET status = 'rejected' WHERE id = %s",
                (review_id,)
            )
        conn.commit()
        return {'success': True, 'message': f'Review {action}d'}
    
    elif method == 'DELETE':
        params = event.get('queryStringParameters', {}) or {}
        review_id = params.get('id')
        
        cursor.execute("DELETE FROM t_p56383043_oli_travel_website.reviews WHERE id = %s", (review_id,))
        conn.commit()
        return {'success': True, 'message': 'Review deleted'}

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    headers = event.get('headers', {})
    admin_token = headers.get('X-Admin-Token') or headers.get('x-admin-token')
    
    if not admin_token or not verify_admin_token(admin_token):
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'success': False, 'error': 'Unauthorized'})
        }
    
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'success': False, 'error': 'Database not configured'})
        }
    
    params = event.get('queryStringParameters', {}) or {}
    resource = params.get('resource', 'submissions')
    
    conn = psycopg2.connect(database_url)
    cursor = conn.cursor()
    
    try:
        if resource == 'submissions':
            result = handle_submissions(method, event, cursor, conn)
        elif resource == 'tours':
            result = handle_tours(method, event, cursor, conn)
        elif resource == 'reviews':
            result = handle_reviews(method, event, cursor, conn)
        else:
            result = {'success': False, 'error': 'Invalid resource'}
        
        status_code = 200 if result.get('success') else 400
        
        return {
            'statusCode': status_code,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps(result)
        }
    
    finally:
        cursor.close()
        conn.close()
