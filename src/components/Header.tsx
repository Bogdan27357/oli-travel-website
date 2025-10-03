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
              { id: 'hotels', label: 'Отели' },
              { id: 'countries', label: 'Направления' },
              { id: 'reviews', label: 'Отзывы' },
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
            <a href="/admin/chat">
              <button className="px-4 py-2 rounded-lg border border-orange-300 hover:bg-orange-50 transition-colors text-sm font-medium text-orange-600 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <span className="hidden sm:inline">Чат менеджера</span>
              </button>
            </a>
            <a href="/admin/login">
              <button className="px-4 py-2 rounded-lg border border-blue-300 hover:bg-blue-50 transition-colors text-sm font-medium text-blue-600 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                <span className="hidden sm:inline">Админ-панель</span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}