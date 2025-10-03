import { Button } from '@/components/ui/button';

interface HeaderProps {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

export default function Header({ activeSection, scrollToSection }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 animate-fade-in">
            <img src="/img/ba1adb08-b692-455f-9800-71be9436d24a.jpg" alt="OliTravel" className="h-12 w-12 object-contain" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              OliTravel
            </span>
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

          <a href="/admin" className="hidden md:block">
            <Button variant="outline" size="sm" className="gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}