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

def handle_tours(method: str, event: Dict[str, Any], cursor, conn) -> Dict[str, Any]:
    """
    Handle CRUD operations for tours table
    Schema: id, title, country, city, hotel, stars, dates, duration, price, 
            old_price, image_url, description, includes, flight_included, 
            is_hot, is_active, created_at, updated_at
    """
    schema = get_schema_name()
    
    if method == 'GET':
        params = event.get('queryStringParameters', {}) or {}
        tour_id = params.get('id')
        
        if tour_id:
            # Get single tour by ID
            cursor.execute(
                f"SELECT id, title, country, city, hotel, stars, dates, duration, price, "
                f"old_price, image_url, description, includes, flight_included, is_hot, "
                f"is_active, created_at, updated_at FROM {schema}.tours WHERE id = %s",
                (tour_id,)
            )
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
            # Get all tours with pagination and filters
            limit = int(params.get('limit', 100))
            offset = int(params.get('offset', 0))
            is_active = params.get('is_active')
            is_hot = params.get('is_hot')
            country = params.get('country')
            
            query = f"SELECT id, title, country, city, hotel, stars, dates, duration, price, " \
                    f"old_price, image_url, description, includes, flight_included, is_hot, " \
                    f"is_active, created_at, updated_at FROM {schema}.tours WHERE 1=1"
            query_params = []
            
            if is_active is not None:
                query += " AND is_active = %s"
                query_params.append(is_active == 'true')
            
            if is_hot is not None:
                query += " AND is_hot = %s"
                query_params.append(is_hot == 'true')
            
            if country:
                query += " AND country ILIKE %s"
                query_params.append(f'%{country}%')
            
            query += " ORDER BY created_at DESC LIMIT %s OFFSET %s"
            query_params.extend([limit, offset])
            
            cursor.execute(query, query_params)
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
            
            # Get total count
            count_query = f"SELECT COUNT(*) FROM {schema}.tours WHERE 1=1"
            count_params = []
            
            if is_active is not None:
                count_query += " AND is_active = %s"
                count_params.append(is_active == 'true')
            
            if is_hot is not None:
                count_query += " AND is_hot = %s"
                count_params.append(is_hot == 'true')
            
            if country:
                count_query += " AND country ILIKE %s"
                count_params.append(f'%{country}%')
            
            cursor.execute(count_query, count_params)
            total = cursor.fetchone()[0]
            
            return {'success': True, 'tours': tours, 'total': total}
    
    elif method == 'POST':
        # Create new tour
        body_data = json.loads(event.get('body', '{}'))
        
        cursor.execute(
            f"INSERT INTO {schema}.tours "
            f"(title, country, city, hotel, stars, dates, duration, price, old_price, "
            f"image_url, description, includes, flight_included, is_hot, is_active) "
            f"VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) "
            f"RETURNING id",
            (
                body_data.get('title'),
                body_data.get('country'),
                body_data.get('city'),
                body_data.get('hotel'),
                body_data.get('stars'),
                body_data.get('dates'),
                body_data.get('duration'),
                body_data.get('price'),
                body_data.get('old_price'),
                body_data.get('image_url'),
                body_data.get('description'),
                json.dumps(body_data.get('includes', [])) if isinstance(body_data.get('includes'), list) else body_data.get('includes'),
                body_data.get('flight_included', False),
                body_data.get('is_hot', False),
                body_data.get('is_active', True)
            )
        )
        new_id = cursor.fetchone()[0]
        conn.commit()
        return {'success': True, 'id': new_id, 'message': 'Tour created successfully'}
    
    elif method == 'PUT':
        # Update existing tour
        body_data = json.loads(event.get('body', '{}'))
        tour_id = body_data.get('id')
        
        if not tour_id:
            return {'success': False, 'error': 'Tour ID is required'}
        
        cursor.execute(
            f"UPDATE {schema}.tours SET "
            f"title = %s, country = %s, city = %s, hotel = %s, stars = %s, dates = %s, "
            f"duration = %s, price = %s, old_price = %s, image_url = %s, description = %s, "
            f"includes = %s, flight_included = %s, is_hot = %s, is_active = %s, "
            f"updated_at = CURRENT_TIMESTAMP WHERE id = %s",
            (
                body_data.get('title'),
                body_data.get('country'),
                body_data.get('city'),
                body_data.get('hotel'),
                body_data.get('stars'),
                body_data.get('dates'),
                body_data.get('duration'),
                body_data.get('price'),
                body_data.get('old_price'),
                body_data.get('image_url'),
                body_data.get('description'),
                json.dumps(body_data.get('includes', [])) if isinstance(body_data.get('includes'), list) else body_data.get('includes'),
                body_data.get('flight_included'),
                body_data.get('is_hot'),
                body_data.get('is_active'),
                tour_id
            )
        )
        conn.commit()
        return {'success': True, 'message': 'Tour updated successfully'}
    
    elif method == 'DELETE':
        # Deactivate tour (soft delete)
        params = event.get('queryStringParameters', {}) or {}
        body_data = json.loads(event.get('body', '{}')) if event.get('body') else {}
        tour_id = params.get('id') or body_data.get('id')
        
        if not tour_id:
            return {'success': False, 'error': 'Tour ID is required'}
        
        cursor.execute(
            f"UPDATE {schema}.tours SET is_active = FALSE, updated_at = CURRENT_TIMESTAMP WHERE id = %s",
            (tour_id,)
        )
        conn.commit()
        return {'success': True, 'message': 'Tour deactivated successfully'}

def handle_reviews(method: str, event: Dict[str, Any], cursor, conn) -> Dict[str, Any]:
    """
    Handle CRUD operations for reviews table
    Schema: id, author_name, author_avatar, country, rating, comment, 
            date, is_approved, created_at
    """
    schema = get_schema_name()
    
    if method == 'GET':
        params = event.get('queryStringParameters', {}) or {}
        review_id = params.get('id')
        
        if review_id:
            # Get single review by ID
            cursor.execute(
                f"SELECT id, author_name, author_avatar, country, rating, comment, "
                f"date, is_approved, created_at FROM {schema}.reviews WHERE id = %s",
                (review_id,)
            )
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
            # Get all reviews with pagination and filters
            limit = int(params.get('limit', 100))
            offset = int(params.get('offset', 0))
            is_approved = params.get('is_approved')
            
            query = f"SELECT id, author_name, author_avatar, country, rating, comment, " \
                    f"date, is_approved, created_at FROM {schema}.reviews WHERE 1=1"
            query_params = []
            
            if is_approved is not None:
                query += " AND is_approved = %s"
                query_params.append(is_approved == 'true')
            
            query += " ORDER BY created_at DESC LIMIT %s OFFSET %s"
            query_params.extend([limit, offset])
            
            cursor.execute(query, query_params)
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
            
            # Get total and pending counts
            count_query = f"SELECT COUNT(*) FROM {schema}.reviews WHERE 1=1"
            count_params = []
            
            if is_approved is not None:
                count_query += " AND is_approved = %s"
                count_params.append(is_approved == 'true')
            
            cursor.execute(count_query, count_params)
            total = cursor.fetchone()[0]
            
            cursor.execute(f"SELECT COUNT(*) FROM {schema}.reviews WHERE is_approved = FALSE")
            pending = cursor.fetchone()[0]
            
            return {'success': True, 'reviews': reviews, 'total': total, 'pending': pending}
    
    elif method == 'POST':
        # Create new review
        body_data = json.loads(event.get('body', '{}'))
        
        cursor.execute(
            f"INSERT INTO {schema}.reviews "
            f"(author_name, author_avatar, country, rating, comment, date, is_approved) "
            f"VALUES (%s, %s, %s, %s, %s, %s, %s) "
            f"RETURNING id",
            (
                body_data.get('author_name'),
                body_data.get('author_avatar'),
                body_data.get('country'),
                body_data.get('rating'),
                body_data.get('comment'),
                body_data.get('date'),
                body_data.get('is_approved', False)
            )
        )
        new_id = cursor.fetchone()[0]
        conn.commit()
        return {'success': True, 'id': new_id, 'message': 'Review created successfully'}
    
    elif method == 'PUT':
        # Update or approve review
        body_data = json.loads(event.get('body', '{}'))
        review_id = body_data.get('id')
        
        if not review_id:
            return {'success': False, 'error': 'Review ID is required'}
        
        # Check if this is an approval action
        action = body_data.get('action')
        
        if action == 'approve':
            cursor.execute(
                f"UPDATE {schema}.reviews SET is_approved = TRUE WHERE id = %s",
                (review_id,)
            )
            conn.commit()
            return {'success': True, 'message': 'Review approved successfully'}
        elif action == 'reject':
            cursor.execute(
                f"UPDATE {schema}.reviews SET is_approved = FALSE WHERE id = %s",
                (review_id,)
            )
            conn.commit()
            return {'success': True, 'message': 'Review rejected successfully'}
        else:
            # Regular update
            cursor.execute(
                f"UPDATE {schema}.reviews SET "
                f"author_name = %s, author_avatar = %s, country = %s, rating = %s, "
                f"comment = %s, date = %s, is_approved = %s WHERE id = %s",
                (
                    body_data.get('author_name'),
                    body_data.get('author_avatar'),
                    body_data.get('country'),
                    body_data.get('rating'),
                    body_data.get('comment'),
                    body_data.get('date'),
                    body_data.get('is_approved'),
                    review_id
                )
            )
            conn.commit()
            return {'success': True, 'message': 'Review updated successfully'}
    
    elif method == 'DELETE':
        # Delete review permanently
        params = event.get('queryStringParameters', {}) or {}
        body_data = json.loads(event.get('body', '{}')) if event.get('body') else {}
        review_id = params.get('id') or body_data.get('id')
        
        if not review_id:
            return {'success': False, 'error': 'Review ID is required'}
        
        cursor.execute(f"DELETE FROM {schema}.reviews WHERE id = %s", (review_id,))
        conn.commit()
        return {'success': True, 'message': 'Review deleted successfully'}

def handle_requests(method: str, event: Dict[str, Any], cursor, conn) -> Dict[str, Any]:
    """
    Handle operations for contact_requests table
    Schema: id, name, email, phone, message, status, created_at, processed_at, notes
    """
    schema = get_schema_name()
    
    if method == 'GET':
        params = event.get('queryStringParameters', {}) or {}
        request_id = params.get('id')
        
        if request_id:
            # Get single request by ID
            cursor.execute(
                f"SELECT id, name, email, phone, message, status, created_at, "
                f"processed_at, notes FROM {schema}.contact_requests WHERE id = %s",
                (request_id,)
            )
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
            # Get all requests with pagination and filters
            limit = int(params.get('limit', 100))
            offset = int(params.get('offset', 0))
            status = params.get('status')
            
            query = f"SELECT id, name, email, phone, message, status, created_at, " \
                    f"processed_at, notes FROM {schema}.contact_requests WHERE 1=1"
            query_params = []
            
            if status:
                query += " AND status = %s"
                query_params.append(status)
            
            query += " ORDER BY created_at DESC LIMIT %s OFFSET %s"
            query_params.extend([limit, offset])
            
            cursor.execute(query, query_params)
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
            
            # Get total and status counts
            count_query = f"SELECT COUNT(*) FROM {schema}.contact_requests WHERE 1=1"
            count_params = []
            
            if status:
                count_query += " AND status = %s"
                count_params.append(status)
            
            cursor.execute(count_query, count_params)
            total = cursor.fetchone()[0]
            
            cursor.execute(f"SELECT COUNT(*) FROM {schema}.contact_requests WHERE status = 'pending'")
            pending = cursor.fetchone()[0]
            
            cursor.execute(f"SELECT COUNT(*) FROM {schema}.contact_requests WHERE status = 'in_progress'")
            in_progress = cursor.fetchone()[0]
            
            cursor.execute(f"SELECT COUNT(*) FROM {schema}.contact_requests WHERE status = 'completed'")
            completed = cursor.fetchone()[0]
            
            return {
                'success': True,
                'requests': requests,
                'total': total,
                'stats': {
                    'pending': pending,
                    'in_progress': in_progress,
                    'completed': completed
                }
            }
    
    elif method == 'PUT':
        # Update request status and notes
        body_data = json.loads(event.get('body', '{}'))
        request_id = body_data.get('id')
        
        if not request_id:
            return {'success': False, 'error': 'Request ID is required'}
        
        new_status = body_data.get('status')
        notes = body_data.get('notes')
        
        # Build update query dynamically
        update_fields = []
        update_values = []
        
        if new_status:
            update_fields.append("status = %s")
            update_values.append(new_status)
            
            # Set processed_at if status is completed
            if new_status == 'completed':
                update_fields.append("processed_at = CURRENT_TIMESTAMP")
        
        if notes is not None:
            update_fields.append("notes = %s")
            update_values.append(notes)
        
        if not update_fields:
            return {'success': False, 'error': 'No fields to update'}
        
        update_values.append(request_id)
        
        cursor.execute(
            f"UPDATE {schema}.contact_requests SET {', '.join(update_fields)} WHERE id = %s",
            update_values
        )
        conn.commit()
        return {'success': True, 'message': 'Request updated successfully'}

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """Main handler function for the admin API"""
    
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS preflight
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
    
    # Verify admin token
    headers = event.get('headers', {})
    admin_token = headers.get('X-Admin-Token') or headers.get('x-admin-token')
    
    if not admin_token or not verify_admin_token(admin_token):
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'success': False, 'error': 'Unauthorized - Invalid or missing admin token'})
        }
    
    # Check database configuration
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'success': False, 'error': 'Database not configured'})
        }
    
    # Determine resource from query parameters or path
    params = event.get('queryStringParameters', {}) or {}
    path = event.get('path', '')
    
    # Extract resource from path (e.g., /tours, /reviews, /requests)
    resource = params.get('resource')
    if not resource and path:
        path_parts = path.strip('/').split('/')
        if path_parts:
            resource = path_parts[-1]
    
    if not resource:
        resource = 'tours'  # Default resource
    
    # Connect to database
    conn = None
    cursor = None
    
    try:
        conn = psycopg2.connect(database_url)
        cursor = conn.cursor()
        
        # Route to appropriate handler
        if resource == 'tours':
            result = handle_tours(method, event, cursor, conn)
        elif resource == 'reviews':
            result = handle_reviews(method, event, cursor, conn)
        elif resource in ['requests', 'contact_requests']:
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
