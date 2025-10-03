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
            {/* Админ-ссылки скрыты от клиентов */}
          </div>
        </div>
      </div>
    </header>
  );
}