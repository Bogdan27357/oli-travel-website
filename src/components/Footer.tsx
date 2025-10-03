import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/img/8cca68ee-013b-4080-8459-d6ba015ad7ef.jpg" alt="OliTravel" className="h-12 object-contain" />
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
              <li className="flex items-center gap-2 hover:text-white transition-colors">
                <Icon name="Phone" size={16} />
                <a href="tel:+79819812990">Ольга: +7 981 981-29-90</a>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors">
                <Icon name="Phone" size={16} />
                <a href="tel:+79219456735">Вячеслав: +7 921 945-67-35</a>
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