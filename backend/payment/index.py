'''
Business: Payment processing API for tour bookings with Stripe integration
Args: event with httpMethod, body, queryStringParameters; context with request_id
Returns: HTTP response with payment intent or checkout session
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
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    
    try:
        import stripe
        stripe.api_key = os.environ.get('STRIPE_SECRET_KEY', '')
        
        if method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            action = body_data.get('action', 'create_payment')
            
            if action == 'create_payment':
                amount = body_data.get('amount')
                currency = body_data.get('currency', 'rub')
                tour_name = body_data.get('tour_name', 'Тур')
                customer_email = body_data.get('customer_email')
                
                if not amount:
                    return {
                        'statusCode': 400,
                        'headers': headers,
                        'body': json.dumps({
                            'success': False,
                            'error': 'Amount is required'
                        })
                    }
                
                try:
                    checkout_session = stripe.checkout.Session.create(
                        payment_method_types=['card'],
                        line_items=[{
                            'price_data': {
                                'currency': currency,
                                'product_data': {
                                    'name': tour_name,
                                    'description': 'Бронирование тура'
                                },
                                'unit_amount': int(amount * 100),
                            },
                            'quantity': 1,
                        }],
                        mode='payment',
                        success_url=body_data.get('success_url', 'https://yoursite.com/success'),
                        cancel_url=body_data.get('cancel_url', 'https://yoursite.com/cancel'),
                        customer_email=customer_email
                    )
                    
                    return {
                        'statusCode': 200,
                        'headers': headers,
                        'body': json.dumps({
                            'success': True,
                            'session_id': checkout_session.id,
                            'url': checkout_session.url
                        })
                    }
                
                except stripe.error.StripeError as e:
                    return {
                        'statusCode': 400,
                        'headers': headers,
                        'body': json.dumps({
                            'success': False,
                            'error': str(e)
                        })
                    }
            
            elif action == 'verify_payment':
                session_id = body_data.get('session_id')
                
                if not session_id:
                    return {
                        'statusCode': 400,
                        'headers': headers,
                        'body': json.dumps({
                            'success': False,
                            'error': 'Session ID required'
                        })
                    }
                
                try:
                    checkout_session = stripe.checkout.Session.retrieve(session_id)
                    
                    return {
                        'statusCode': 200,
                        'headers': headers,
                        'body': json.dumps({
                            'success': True,
                            'payment_status': checkout_session.payment_status,
                            'customer_email': checkout_session.customer_email,
                            'amount_total': checkout_session.amount_total / 100
                        })
                    }
                
                except stripe.error.StripeError as e:
                    return {
                        'statusCode': 400,
                        'headers': headers,
                        'body': json.dumps({
                            'success': False,
                            'error': str(e)
                        })
                    }
        
        return {
            'statusCode': 405,
            'headers': headers,
            'body': json.dumps({
                'success': False,
                'error': 'Method not allowed'
            })
        }
    
    except ImportError:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({
                'success': False,
                'error': 'Stripe library not installed. Please add stripe to requirements.txt'
            })
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({
                'success': False,
                'error': str(e)
            })
        }
