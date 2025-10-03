import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/img/a6646f57-0a66-476a-9d43-6a33fed933cb.jpg" alt="OliTravel" className="h-10 w-10 object-contain" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                OliTravel
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Туры из Санкт-Петербурга по всему миру
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Направления</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white transition-colors cursor-pointer">Турция</li>
              <li className="hover:text-white transition-colors cursor-pointer">ОАЭ</li>
              <li className="hover:text-white transition-colors cursor-pointer">Таиланд</li>
              <li className="hover:text-white transition-colors cursor-pointer">Египет</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Компания</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white transition-colors cursor-pointer">О нас</li>
              <li className="hover:text-white transition-colors cursor-pointer">Контакты</li>
              <li className="hover:text-white transition-colors cursor-pointer">Отзывы</li>
              <li className="hover:text-white transition-colors cursor-pointer">Вакансии</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Icon name="Phone" size={16} />
                +7 (812) 123-45-67
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Mail" size={16} />
                info@olitravel.ru
              </li>
              <li className="flex items-center gap-2">
                <Icon name="MapPin" size={16} />
                Санкт-Петербург
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>© 2024 OliTravel. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
