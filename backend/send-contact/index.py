import json
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Send contact form emails from website to company email
    Args: event with httpMethod, body (name, email, phone, message)
          context with request_id
    Returns: HTTP response with success/error status
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
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    name = body_data.get('name', '')
    email = body_data.get('email', '')
    phone = body_data.get('phone', '')
    message = body_data.get('message', '')
    
    if not all([name, email, message]):
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Заполните все обязательные поля'})
        }
    
    smtp_host = os.environ.get('SMTP_HOST')
    smtp_port = int(os.environ.get('SMTP_PORT', '587'))
    smtp_user = os.environ.get('SMTP_USER')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    contact_email = os.environ.get('CONTACT_EMAIL')
    
    if not all([smtp_host, smtp_user, smtp_password, contact_email]):
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Email сервис не настроен'})
        }
    
    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка с сайта от {name}'
    msg['From'] = smtp_user
    msg['To'] = contact_email
    msg['Reply-To'] = email
    
    html_content = f'''
    <html>
      <head>
        <style>
          body {{ font-family: Arial, sans-serif; line-height: 1.6; }}
          .container {{ max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }}
          .header {{ background: linear-gradient(135deg, #D2956E 0%, #5FC9BF 100%); color: white; padding: 20px; text-align: center; }}
          .content {{ background: white; padding: 30px; margin-top: 20px; border-radius: 8px; }}
          .field {{ margin-bottom: 15px; }}
          .label {{ font-weight: bold; color: #555; }}
          .value {{ color: #333; margin-top: 5px; }}
          .footer {{ text-align: center; color: #888; margin-top: 20px; font-size: 12px; }}
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 Новая заявка с сайта</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">👤 Имя:</div>
              <div class="value">{name}</div>
            </div>
            <div class="field">
              <div class="label">📧 Email:</div>
              <div class="value"><a href="mailto:{email}">{email}</a></div>
            </div>
            <div class="field">
              <div class="label">📱 Телефон:</div>
              <div class="value">{phone if phone else 'Не указан'}</div>
            </div>
            <div class="field">
              <div class="label">💬 Сообщение:</div>
              <div class="value">{message}</div>
            </div>
            <div class="field">
              <div class="label">🕐 Время:</div>
              <div class="value">{datetime.now().strftime('%d.%m.%Y %H:%M:%S')}</div>
            </div>
          </div>
          <div class="footer">
            Заявка отправлена автоматически с сайта туристического агентства
          </div>
        </div>
      </body>
    </html>
    '''
    
    text_content = f'''
    Новая заявка с сайта
    
    Имя: {name}
    Email: {email}
    Телефон: {phone if phone else 'Не указан'}
    Сообщение: {message}
    Время: {datetime.now().strftime('%d.%m.%Y %H:%M:%S')}
    '''
    
    part1 = MIMEText(text_content, 'plain', 'utf-8')
    part2 = MIMEText(html_content, 'html', 'utf-8')
    
    msg.attach(part1)
    msg.attach(part2)
    
    try:
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.send_message(msg)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'success': True,
                'message': 'Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.'
            })
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': 'Ошибка отправки письма',
                'details': str(e)
            })
        }
