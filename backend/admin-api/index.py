'''
Business: Universal admin API for tours, reviews, and contact requests management
Args: event with httpMethod, body, queryStringParameters, path; context with request_id
Returns: HTTP response with data or success status
'''

import json
import os
import psycopg2
from typing import Dict, Any
import jwt
from datetime import datetime

def get_schema_name() -> str:
    """Get schema name from environment or use default"""
    return os.environ.get('DB_SCHEMA', 't_p56383043_oli_travel_website')

def verify_admin_token(token: str) -> bool:
    """Verify JWT admin token"""
    try:
        jwt_secret = os.environ.get('JWT_SECRET')
        if not jwt_secret:
            return False
        jwt.decode(token, jwt_secret, algorithms=['HS256'])
        return True
    except:
        return False

def escape_sql_string(value) -> str:
    """Escape string for SQL by replacing ' with ''"""
    if value is None:
        return 'NULL'
    return "'" + str(value).replace("'", "''") + "'"

def escape_sql_value(value) -> str:
    """Convert Python value to SQL literal"""
    if value is None:
        return 'NULL'
    elif isinstance(value, bool):
        return 'TRUE' if value else 'FALSE'
    elif isinstance(value, (int, float)):
        return str(value)
    else:
        return escape_sql_string(value)

def handle_tours(method: str, event: Dict[str, Any], cursor, conn) -> Dict[str, Any]:
    """
    Handle CRUD operations for tours table
    """
    schema = get_schema_name()
    
    if method == 'GET':
        params = event.get('queryStringParameters', {}) or {}
        tour_id = params.get('id')
        
        if tour_id:
            query = (
                f"SELECT id, title, country, city, hotel, stars, dates, duration, price, "
                f"old_price, image_url, description, includes, flight_included, is_hot, "
                f"is_active, created_at, updated_at FROM {schema}.tours WHERE id = {escape_sql_value(tour_id)}"
            )
            cursor.execute(query)
            row = cursor.fetchone()
            if not row:
                return {'success': False, 'error': 'Tour not found'}
            
            tour = {
                'id': row[0],
                'title': row[1],
                'country': row[2],
                'city': row[3],
                'hotel': row[4],
                'stars': row[5],
                'dates': row[6],
                'duration': row[7],
                'price': float(row[8]) if row[8] else 0,
                'old_price': float(row[9]) if row[9] else None,
                'image_url': row[10],
                'description': row[11],
                'includes': row[12] or [],
                'flight_included': row[13],
                'is_hot': row[14],
                'is_active': row[15],
                'created_at': row[16].isoformat() if row[16] else None,
                'updated_at': row[17].isoformat() if row[17] else None
            }
            return {'success': True, 'tour': tour}
        else:
            limit = int(params.get('limit', 100))
            offset = int(params.get('offset', 0))
            is_active = params.get('is_active')
            is_hot = params.get('is_hot')
            country = params.get('country')
            
            query = (
                f"SELECT id, title, country, city, hotel, stars, dates, duration, price, "
                f"old_price, image_url, description, includes, flight_included, is_hot, "
                f"is_active, created_at, updated_at FROM {schema}.tours WHERE 1=1"
            )
            
            if is_active is not None:
                is_active_bool = 'TRUE' if is_active == 'true' else 'FALSE'
                query += f" AND is_active = {is_active_bool}"
            
            if is_hot is not None:
                is_hot_bool = 'TRUE' if is_hot == 'true' else 'FALSE'
                query += f" AND is_hot = {is_hot_bool}"
            
            if country:
                escaped_country = str(country).replace("'", "''")
                query += f" AND country ILIKE '%{escaped_country}%'"
            
            query += f" ORDER BY created_at DESC LIMIT {limit} OFFSET {offset}"
            
            cursor.execute(query)
            rows = cursor.fetchall()
            
            tours = []
            for row in rows:
                tours.append({
                    'id': row[0],
                    'title': row[1],
                    'country': row[2],
                    'city': row[3],
                    'hotel': row[4],
                    'stars': row[5],
                    'dates': row[6],
                    'duration': row[7],
                    'price': float(row[8]) if row[8] else 0,
                    'old_price': float(row[9]) if row[9] else None,
                    'image_url': row[10],
                    'description': row[11],
                    'includes': row[12] or [],
                    'flight_included': row[13],
                    'is_hot': row[14],
                    'is_active': row[15],
                    'created_at': row[16].isoformat() if row[16] else None,
                    'updated_at': row[17].isoformat() if row[17] else None
                })
            
            count_query = f"SELECT COUNT(*) FROM {schema}.tours WHERE 1=1"
            
            if is_active is not None:
                is_active_bool = 'TRUE' if is_active == 'true' else 'FALSE'
                count_query += f" AND is_active = {is_active_bool}"
            
            if is_hot is not None:
                is_hot_bool = 'TRUE' if is_hot == 'true' else 'FALSE'
                count_query += f" AND is_hot = {is_hot_bool}"
            
            if country:
                escaped_country = str(country).replace("'", "''")
                count_query += f" AND country ILIKE '%{escaped_country}%'"
            
            cursor.execute(count_query)
            total = cursor.fetchone()[0]
            
            return {'success': True, 'tours': tours, 'total': total}
    
    elif method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        
        includes = body_data.get('includes', [])
        if isinstance(includes, list):
            includes_json = json.dumps(includes).replace("'", "''")
        else:
            includes_json = str(includes).replace("'", "''") if includes else '[]'
        
        query = (
            f"INSERT INTO {schema}.tours "
            f"(title, country, city, hotel, stars, dates, duration, price, old_price, "
            f"image_url, description, includes, flight_included, is_hot, is_active) "
            f"VALUES ("
            f"{escape_sql_value(body_data.get('title'))}, "
            f"{escape_sql_value(body_data.get('country'))}, "
            f"{escape_sql_value(body_data.get('city'))}, "
            f"{escape_sql_value(body_data.get('hotel'))}, "
            f"{escape_sql_value(body_data.get('stars'))}, "
            f"{escape_sql_value(body_data.get('dates'))}, "
            f"{escape_sql_value(body_data.get('duration'))}, "
            f"{escape_sql_value(body_data.get('price'))}, "
            f"{escape_sql_value(body_data.get('old_price'))}, "
            f"{escape_sql_value(body_data.get('image_url'))}, "
            f"{escape_sql_value(body_data.get('description'))}, "
            f"'{includes_json}', "
            f"{escape_sql_value(body_data.get('flight_included', False))}, "
            f"{escape_sql_value(body_data.get('is_hot', False))}, "
            f"{escape_sql_value(body_data.get('is_active', True))}"
            f") RETURNING id"
        )
        cursor.execute(query)
        new_id = cursor.fetchone()[0]
        conn.commit()
        return {'success': True, 'id': new_id, 'message': 'Tour created successfully'}
    
    elif method == 'PUT':
        body_data = json.loads(event.get('body', '{}'))
        tour_id = body_data.get('id')
        
        if not tour_id:
            return {'success': False, 'error': 'Tour ID is required'}
        
        includes = body_data.get('includes', [])
        if isinstance(includes, list):
            includes_json = json.dumps(includes).replace("'", "''")
        else:
            includes_json = str(includes).replace("'", "''") if includes else '[]'
        
        query = (
            f"UPDATE {schema}.tours SET "
            f"title = {escape_sql_value(body_data.get('title'))}, "
            f"country = {escape_sql_value(body_data.get('country'))}, "
            f"city = {escape_sql_value(body_data.get('city'))}, "
            f"hotel = {escape_sql_value(body_data.get('hotel'))}, "
            f"stars = {escape_sql_value(body_data.get('stars'))}, "
            f"dates = {escape_sql_value(body_data.get('dates'))}, "
            f"duration = {escape_sql_value(body_data.get('duration'))}, "
            f"price = {escape_sql_value(body_data.get('price'))}, "
            f"old_price = {escape_sql_value(body_data.get('old_price'))}, "
            f"image_url = {escape_sql_value(body_data.get('image_url'))}, "
            f"description = {escape_sql_value(body_data.get('description'))}, "
            f"includes = '{includes_json}', "
            f"flight_included = {escape_sql_value(body_data.get('flight_included'))}, "
            f"is_hot = {escape_sql_value(body_data.get('is_hot'))}, "
            f"is_active = {escape_sql_value(body_data.get('is_active'))}, "
            f"updated_at = CURRENT_TIMESTAMP "
            f"WHERE id = {escape_sql_value(tour_id)}"
        )
        cursor.execute(query)
        conn.commit()
        return {'success': True, 'message': 'Tour updated successfully'}
    
    elif method == 'DELETE':
        params = event.get('queryStringParameters', {}) or {}
        body_data = json.loads(event.get('body', '{}')) if event.get('body') else {}
        tour_id = params.get('id') or body_data.get('id')
        
        if not tour_id:
            return {'success': False, 'error': 'Tour ID is required'}
        
        query = (
            f"UPDATE {schema}.tours SET is_active = FALSE, "
            f"updated_at = CURRENT_TIMESTAMP WHERE id = {escape_sql_value(tour_id)}"
        )
        cursor.execute(query)
        conn.commit()
        return {'success': True, 'message': 'Tour deactivated successfully'}

def handle_reviews(method: str, event: Dict[str, Any], cursor, conn) -> Dict[str, Any]:
    """Handle CRUD operations for reviews table"""
    schema = get_schema_name()
    
    if method == 'GET':
        params = event.get('queryStringParameters', {}) or {}
        review_id = params.get('id')
        
        if review_id:
            query = (
                f"SELECT id, author_name, author_avatar, country, rating, comment, "
                f"date, is_approved, created_at FROM {schema}.reviews "
                f"WHERE id = {escape_sql_value(review_id)}"
            )
            cursor.execute(query)
            row = cursor.fetchone()
            if not row:
                return {'success': False, 'error': 'Review not found'}
            
            review = {
                'id': row[0],
                'author_name': row[1],
                'author_avatar': row[2],
                'country': row[3],
                'rating': row[4],
                'comment': row[5],
                'date': row[6],
                'is_approved': row[7],
                'created_at': row[8].isoformat() if row[8] else None
            }
            return {'success': True, 'review': review}
        else:
            limit = int(params.get('limit', 100))
            offset = int(params.get('offset', 0))
            is_approved = params.get('is_approved')
            status = params.get('status')
            
            query = (
                f"SELECT id, author_name, author_avatar, country, rating, comment, "
                f"date, is_approved, created_at FROM {schema}.reviews WHERE 1=1"
            )
            
            if is_approved is not None:
                is_approved_bool = 'TRUE' if is_approved == 'true' else 'FALSE'
                query += f" AND is_approved = {is_approved_bool}"
            
            if status == 'pending':
                query += " AND is_approved = FALSE"
            elif status == 'approved':
                query += " AND is_approved = TRUE"
            
            query += f" ORDER BY created_at DESC LIMIT {limit} OFFSET {offset}"
            
            cursor.execute(query)
            rows = cursor.fetchall()
            
            reviews = []
            for row in rows:
                reviews.append({
                    'id': row[0],
                    'author_name': row[1],
                    'author_avatar': row[2],
                    'country': row[3],
                    'rating': row[4],
                    'comment': row[5],
                    'date': row[6],
                    'is_approved': row[7],
                    'created_at': row[8].isoformat() if row[8] else None
                })
            
            count_query = f"SELECT COUNT(*) FROM {schema}.reviews WHERE 1=1"
            
            if is_approved is not None:
                is_approved_bool = 'TRUE' if is_approved == 'true' else 'FALSE'
                count_query += f" AND is_approved = {is_approved_bool}"
            
            if status == 'pending':
                count_query += " AND is_approved = FALSE"
            elif status == 'approved':
                count_query += " AND is_approved = TRUE"
            
            cursor.execute(count_query)
            total = cursor.fetchone()[0]
            
            cursor.execute(f"SELECT COUNT(*) FROM {schema}.reviews WHERE is_approved = FALSE")
            pending = cursor.fetchone()[0]
            
            return {'success': True, 'reviews': reviews, 'total': total, 'pending': pending}
    
    elif method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        
        query = (
            f"INSERT INTO {schema}.reviews "
            f"(author_name, author_avatar, country, rating, comment, date, is_approved) "
            f"VALUES ("
            f"{escape_sql_value(body_data.get('author_name'))}, "
            f"{escape_sql_value(body_data.get('author_avatar'))}, "
            f"{escape_sql_value(body_data.get('country'))}, "
            f"{escape_sql_value(body_data.get('rating'))}, "
            f"{escape_sql_value(body_data.get('comment'))}, "
            f"{escape_sql_value(body_data.get('date'))}, "
            f"{escape_sql_value(body_data.get('is_approved', False))}"
            f") RETURNING id"
        )
        cursor.execute(query)
        new_id = cursor.fetchone()[0]
        conn.commit()
        return {'success': True, 'id': new_id, 'message': 'Review created successfully'}
    
    elif method == 'PUT':
        body_data = json.loads(event.get('body', '{}'))
        review_id = body_data.get('id')
        
        if not review_id:
            return {'success': False, 'error': 'Review ID is required'}
        
        action = body_data.get('action')
        
        if action == 'approve':
            query = (
                f"UPDATE {schema}.reviews SET is_approved = TRUE "
                f"WHERE id = {escape_sql_value(review_id)}"
            )
            cursor.execute(query)
            conn.commit()
            return {'success': True, 'message': 'Review approved successfully'}
        elif action == 'reject':
            query = (
                f"UPDATE {schema}.reviews SET is_approved = FALSE "
                f"WHERE id = {escape_sql_value(review_id)}"
            )
            cursor.execute(query)
            conn.commit()
            return {'success': True, 'message': 'Review rejected successfully'}
        else:
            query = (
                f"UPDATE {schema}.reviews SET "
                f"author_name = {escape_sql_value(body_data.get('author_name'))}, "
                f"author_avatar = {escape_sql_value(body_data.get('author_avatar'))}, "
                f"country = {escape_sql_value(body_data.get('country'))}, "
                f"rating = {escape_sql_value(body_data.get('rating'))}, "
                f"comment = {escape_sql_value(body_data.get('comment'))}, "
                f"date = {escape_sql_value(body_data.get('date'))}, "
                f"is_approved = {escape_sql_value(body_data.get('is_approved'))} "
                f"WHERE id = {escape_sql_value(review_id)}"
            )
            cursor.execute(query)
            conn.commit()
            return {'success': True, 'message': 'Review updated successfully'}
    
    elif method == 'DELETE':
        params = event.get('queryStringParameters', {}) or {}
        body_data = json.loads(event.get('body', '{}')) if event.get('body') else {}
        review_id = params.get('id') or body_data.get('id')
        
        if not review_id:
            return {'success': False, 'error': 'Review ID is required'}
        
        query = f"DELETE FROM {schema}.reviews WHERE id = {escape_sql_value(review_id)}"
        cursor.execute(query)
        conn.commit()
        return {'success': True, 'message': 'Review deleted successfully'}

def handle_requests(method: str, event: Dict[str, Any], cursor, conn) -> Dict[str, Any]:
    """Handle operations for contact_requests table"""
    schema = get_schema_name()
    
    if method == 'GET':
        params = event.get('queryStringParameters', {}) or {}
        request_id = params.get('id')
        
        if request_id:
            query = (
                f"SELECT id, name, email, phone, message, status, created_at, "
                f"processed_at, notes FROM {schema}.contact_requests "
                f"WHERE id = {escape_sql_value(request_id)}"
            )
            cursor.execute(query)
            row = cursor.fetchone()
            if not row:
                return {'success': False, 'error': 'Request not found'}
            
            request = {
                'id': row[0],
                'name': row[1],
                'email': row[2],
                'phone': row[3],
                'message': row[4],
                'status': row[5],
                'created_at': row[6].isoformat() if row[6] else None,
                'processed_at': row[7].isoformat() if row[7] else None,
                'notes': row[8]
            }
            return {'success': True, 'request': request}
        else:
            limit = int(params.get('limit', 100))
            offset = int(params.get('offset', 0))
            status = params.get('status')
            
            query = (
                f"SELECT id, name, email, phone, message, status, created_at, "
                f"processed_at, notes FROM {schema}.contact_requests WHERE 1=1"
            )
            
            if status and status != 'all':
                query += f" AND status = {escape_sql_value(status)}"
            
            query += f" ORDER BY created_at DESC LIMIT {limit} OFFSET {offset}"
            
            cursor.execute(query)
            rows = cursor.fetchall()
            
            requests = []
            for row in rows:
                requests.append({
                    'id': row[0],
                    'name': row[1],
                    'email': row[2],
                    'phone': row[3],
                    'message': row[4],
                    'status': row[5],
                    'created_at': row[6].isoformat() if row[6] else None,
                    'processed_at': row[7].isoformat() if row[7] else None,
                    'notes': row[8]
                })
            
            count_query = f"SELECT COUNT(*) FROM {schema}.contact_requests WHERE 1=1"
            
            if status and status != 'all':
                count_query += f" AND status = {escape_sql_value(status)}"
            
            cursor.execute(count_query)
            total = cursor.fetchone()[0]
            
            cursor.execute(f"SELECT COUNT(*) FROM {schema}.contact_requests WHERE status = 'pending'")
            pending = cursor.fetchone()[0]
            
            cursor.execute(f"SELECT COUNT(*) FROM {schema}.contact_requests WHERE status = 'in_progress'")
            in_progress = cursor.fetchone()[0]
            
            cursor.execute(f"SELECT COUNT(*) FROM {schema}.contact_requests WHERE status = 'completed'")
            completed = cursor.fetchone()[0]
            
            return {
                'success': True,
                'submissions': requests,
                'total': total,
                'stats': {
                    'pending': pending,
                    'in_progress': in_progress,
                    'completed': completed
                }
            }
    
    elif method == 'PUT':
        body_data = json.loads(event.get('body', '{}'))
        request_id = body_data.get('id')
        
        if not request_id:
            return {'success': False, 'error': 'Request ID is required'}
        
        new_status = body_data.get('status')
        notes = body_data.get('notes')
        
        update_fields = []
        
        if new_status:
            update_fields.append(f"status = {escape_sql_value(new_status)}")
            
            if new_status == 'completed':
                update_fields.append("processed_at = CURRENT_TIMESTAMP")
        
        if notes is not None:
            update_fields.append(f"notes = {escape_sql_value(notes)}")
        
        if not update_fields:
            return {'success': False, 'error': 'No fields to update'}
        
        query = (
            f"UPDATE {schema}.contact_requests SET {', '.join(update_fields)} "
            f"WHERE id = {escape_sql_value(request_id)}"
        )
        cursor.execute(query)
        conn.commit()
        return {'success': True, 'message': 'Request updated successfully'}

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """Main handler function for the admin API"""
    
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
    
    params = event.get('queryStringParameters', {}) or {}
    path = event.get('path', '')
    
    resource = params.get('resource')
    if not resource and path:
        path_parts = path.strip('/').split('/')
        if path_parts:
            resource = path_parts[-1]
    
    if not resource:
        resource = 'tours'
    
    is_public_review_submit = (resource == 'reviews' and method == 'POST')
    is_public_review_read = (resource == 'reviews' and method == 'GET')
    is_public_tours_read = (resource == 'tours' and method == 'GET')
    
    headers = event.get('headers', {})
    admin_token = headers.get('X-Admin-Token') or headers.get('x-admin-token')
    
    if not (is_public_review_submit or is_public_review_read or is_public_tours_read) and (not admin_token or not verify_admin_token(admin_token)):
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
    
    conn = None
    cursor = None
    
    try:
        conn = psycopg2.connect(database_url)
        cursor = conn.cursor()
        
        if resource == 'tours':
            result = handle_tours(method, event, cursor, conn)
        elif resource == 'reviews':
            result = handle_reviews(method, event, cursor, conn)
        elif resource in ['requests', 'contact_requests', 'submissions']:
            result = handle_requests(method, event, cursor, conn)
        else:
            result = {'success': False, 'error': f'Invalid resource: {resource}'}
        
        status_code = 200 if result.get('success') else 400
        
        return {
            'statusCode': status_code,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token'
            },
            'isBase64Encoded': False,
            'body': json.dumps(result, default=str)
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'success': False,
                'error': 'Internal server error',
                'details': str(e)
            })
        }
    
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()