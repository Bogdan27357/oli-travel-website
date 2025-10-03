import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';

interface HeaderProps {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

const CHAT_API_URL = 'https://functions.poehali.dev/bcc8f618-4702-4e8b-9aac-7ac6a7b988e6';

export default function Header({ activeSection, scrollToSection }: HeaderProps) {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const response = await fetch(`${CHAT_API_URL}?action=get_all_sessions`);
        const data = await response.json();
        
        if (data.success && data.sessions) {
          const managerLastSeen = localStorage.getItem('manager_last_seen') || '0';
          const count = data.sessions.filter((session: any) => 
            session.last_message_at && new Date(session.last_message_at).getTime() > parseInt(managerLastSeen)
          ).length;
          setUnreadCount(count);
        }
      } catch (error) {
        console.error('Error fetching unread count:', error);
      }
    };

    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 animate-fade-in">
            <img src="/img/8cca68ee-013b-4080-8459-d6ba015ad7ef.jpg" alt="OliTravel" className="h-14 object-contain" />
          </div>
          
          <nav className="hidden lg:flex items-center gap-2">
            {[
              { id: 'home', label: 'Главная' },
              { id: 'tours', label: 'Туры' },
              { id: 'countries', label: 'Страны' },
              { id: 'hotels', label: 'Отели' },
              { id: 'about', label: 'О нас' },
              { id: 'reviews', label: 'Отзывы' },
              { id: 'promotions', label: 'Акции' },
              { id: 'contacts', label: 'Контакты' }
            ].map((item, idx) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                    : 'text-gray-600 hover:text-primary hover:bg-gray-100'
                }`}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href="/admin/chat" className="hidden md:block relative">
              <Button variant="outline" size="sm" className="gap-2 border-orange-300 hover:bg-orange-50">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <span className="text-xs">Чат менеджера</span>
              </Button>
              {unreadCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs animate-pulse"
                >
                  {unreadCount}
                </Badge>
              )}
            </a>
            <a href="/admin">
              <Button variant="outline" size="sm" className="gap-2 border-blue-300 hover:bg-blue-50">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                <span className="hidden sm:inline text-xs">Управление</span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}