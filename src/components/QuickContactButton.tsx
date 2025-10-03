import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function QuickContactButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen && (
        <div className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-2xl p-4 w-64 animate-fade-in">
          <div className="space-y-3">
            <a
              href="https://wa.me/79819812990"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 transition-colors group"
            >
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon name="MessageCircle" size={24} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">WhatsApp</p>
                <p className="text-sm text-gray-600">Ольга: +7 981 981-29-90</p>
              </div>
            </a>

            <a
              href="https://t.me/+79819812990"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition-colors group"
            >
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon name="Send" size={24} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Telegram</p>
                <p className="text-sm text-gray-600">Быстрый ответ 24/7</p>
              </div>
            </a>

            <a
              href="tel:+79819812990"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-50 transition-colors group"
            >
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon name="Phone" size={24} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Позвонить</p>
                <p className="text-sm text-gray-600">+7 981 981-29-90</p>
              </div>
            </a>

            <a
              href="tel:+79219456735"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-50 transition-colors group"
            >
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon name="Phone" size={24} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Позвонить</p>
                <p className="text-sm text-gray-600">+7 921 945-67-35</p>
              </div>
            </a>
          </div>
        </div>
      )}

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary hover:shadow-2xl transition-all duration-300 hover:scale-110 shadow-lg"
      >
        <Icon name={isOpen ? "X" : "Phone"} size={28} className="text-white" />
      </Button>
    </div>
  );
}
