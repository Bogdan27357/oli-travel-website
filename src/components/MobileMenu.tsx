import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

const menuItems = [
  { id: 'home', label: 'Главная', icon: 'Home' },
  { id: 'tours', label: 'Туры заграница', icon: 'Plane' },
  { id: 'russia', label: 'Россия', icon: 'MapPin' },
  { id: 'hotels', label: 'Отели', icon: 'Building2' },
  { id: 'reviews', label: 'Отзывы', icon: 'Star' },
  { id: 'contacts', label: 'Контакты', icon: 'Phone' }
];

const quickActions = [
  { icon: 'Phone', label: 'Позвонить', action: 'tel:+78123456789', color: 'from-green-500 to-emerald-600' },
  { icon: 'MessageCircle', label: 'WhatsApp', action: 'https://wa.me/78123456789', color: 'from-green-600 to-teal-600' },
  { icon: 'Send', label: 'Telegram', action: 'https://t.me/olitravel', color: 'from-blue-500 to-cyan-600' },
  { icon: 'Mail', label: 'Email', action: 'mailto:info@olitravel.ru', color: 'from-orange-500 to-red-600' }
];

export default function MobileMenu({ isOpen, onClose, activeSection, scrollToSection }: MobileMenuProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleItemClick = (sectionId: string) => {
    scrollToSection(sectionId);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Оверлей */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Меню */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl transform transition-transform duration-300 overflow-y-auto ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Шапка меню */}
        <div className="sticky top-0 bg-gradient-to-r from-primary to-secondary text-white p-6 shadow-lg z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                <Icon name="Menu" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-xl">Oli Travel</h3>
                <p className="text-sm opacity-90">Меню навигации</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <Icon name="X" size={24} />
            </button>
          </div>

          {/* Быстрый поиск */}
          <div className="relative">
            <input
              type="text"
              placeholder="Поиск туров..."
              className="w-full px-4 py-3 pl-12 bg-white/20 backdrop-blur border-2 border-white/30 rounded-xl text-white placeholder-white/70 focus:bg-white/30 focus:outline-none transition-colors"
            />
            <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Основное меню */}
        <div className="p-6">
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Навигация</h4>
            <nav className="space-y-2">
              {menuItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activeSection === item.id ? 'bg-white/20' : 'bg-white'
                  }`}>
                    <Icon
                      name={item.icon as any}
                      size={20}
                      className={activeSection === item.id ? 'text-white' : 'text-primary'}
                    />
                  </div>
                  <span className="font-semibold">{item.label}</span>
                  {activeSection === item.id && (
                    <Icon name="ChevronRight" size={20} className="ml-auto" />
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Быстрые действия */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Связаться с нами</h4>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <a
                  key={index}
                  href={action.action}
                  className={`flex flex-col items-center gap-2 p-4 bg-gradient-to-br ${action.color} text-white rounded-xl hover:shadow-xl transition-all hover:scale-105`}
                >
                  <Icon name={action.icon as any} size={24} />
                  <span className="text-sm font-semibold">{action.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Рабочее время */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="Clock" size={20} className="text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Время работы</h4>
                <p className="text-sm text-gray-600">Пн-Пт: 9:00 - 20:00</p>
                <p className="text-sm text-gray-600">Сб-Вс: 10:00 - 18:00</p>
              </div>
            </div>
          </div>

          {/* Социальные сети */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Мы в соцсетях</h4>
            <div className="flex gap-3">
              {['Instagram', 'Facebook', 'Youtube', 'Twitter'].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-12 h-12 bg-gray-100 hover:bg-primary hover:text-white rounded-xl flex items-center justify-center transition-all hover:scale-110"
                >
                  <Icon name={social as any} size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Акции */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Icon name="Percent" size={32} />
              <div>
                <h4 className="font-bold text-lg">Горящие туры</h4>
                <p className="text-sm opacity-90">Скидки до 50%</p>
              </div>
            </div>
            <button className="w-full bg-white text-orange-600 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              Смотреть акции
            </button>
          </div>

          {/* Нижний футер */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>© 2024 Oli Travel</span>
              <div className="flex gap-4">
                <a href="#" className="hover:text-primary transition-colors">Помощь</a>
                <a href="#" className="hover:text-primary transition-colors">О нас</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
