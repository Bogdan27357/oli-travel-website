'''
Business: Process contact form submissions and send email notifications
Args: event with httpMethod, body (name, email, phone, message); context with request_id
Returns: HTTP response with success status
'''

import json
import smtplib
import os
import psycopg2
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any
from datetime import datetime

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
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
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        
        name: str = body_data.get('name', '')
        email: str = body_data.get('email', '')
        phone: str = body_data.get('phone', '')
        message: str = body_data.get('message', '')
        
        if not name or not email or not message:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({
                    'success': False,
                    'error': 'Заполните все обязательные поля'
                })
            }
        
        database_url = os.environ.get('DATABASE_URL')
        if database_url:
            try:
                conn = psycopg2.connect(database_url)
                cursor = conn.cursor()
                
                cursor.execute(
                    "INSERT INTO t_p56383043_oli_travel_website.contact_submissions "
                    "(name, email, phone, message, status) "
                    "VALUES (%s, %s, %s, %s, %s)",
                    (name, email, phone, message, 'new')
                )
                conn.commit()
                cursor.close()
                conn.close()
            except Exception as e:
                print(f"Database error: {e}")
        
        smtp_host = os.environ.get('SMTP_HOST')
        smtp_port = int(os.environ.get('SMTP_PORT', '587'))
        smtp_user = os.environ.get('SMTP_USER')
        smtp_password = os.environ.get('SMTP_PASSWORD')
        contact_email = os.environ.get('CONTACT_EMAIL', 'bogdan273@yandex.ru')
        
        if smtp_host and smtp_user and smtp_password:
            try:
                msg = MIMEMultipart('alternative')
                msg['Subject'] = f'Новая заявка от {name}'
                msg['From'] = smtp_user
                msg['To'] = contact_email
                
                html_body = f'''
                <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
                            📧 Новая заявка с сайта
                        </h2>
                        
                        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                            <p><strong>👤 Имя:</strong> {name}</p>
                            <p><strong>📧 Email:</strong> <a href="mailto:{email}">{email}</a></p>
                            <p><strong>📱 Телефон:</strong> {phone if phone else 'Не указан'}</p>
                        </div>
                        
                        <div style="margin: 20px 0;">
                            <h3 style="color: #2563eb;">💬 Сообщение:</h3>
                            <p style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; white-space: pre-wrap;">
                                {message}
                            </p>
                        </div>
                        
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
                            <p>📅 Дата: {datetime.now().strftime('%d.%m.%Y %H:%M')}</p>
                            <p>🌐 Отправлено с сайта Travel Agency</p>
                        </div>
                    </div>
                </body>
                </html>
                '''
                
                html_part = MIMEText(html_body, 'html', 'utf-8')
                msg.attach(html_part)
                
                with smtplib.SMTP(smtp_host, smtp_port) as server:
                    server.starttls()
                    server.login(smtp_user, smtp_password)
                    server.send_message(msg)
                
            except Exception as e:
                print(f"Email error: {e}")
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({
                'success': True,
                'message': 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.'
            })
        }
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'isBase64Encoded': False,
        'body': json.dumps({'error': 'Method not allowed'})
    }
