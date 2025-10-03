import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function ContactsSection() {
  return (
    <section id="contacts" className="py-20 bg-gradient-to-br from-primary via-yellow-500 to-secondary text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTM2IDEzNGgxMnYxMkgzNnptNDggNDhoMTJ2MTJIODR6bTAsLTQ4aDEydjEySDg0em0tNDggMGgxMnYxMkg0OHoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
          Готовы к путешествию мечты?
        </h2>
        <p className="text-xl mb-8 opacity-95 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          Свяжитесь с нашими менеджерами
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <a 
            href="tel:+79819812990" 
            className="bg-white/95 backdrop-blur-sm hover:bg-white text-primary p-5 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
          >
            <div className="text-center">
              <div className="bg-gradient-to-r from-primary to-secondary p-3 rounded-xl group-hover:scale-110 transition-transform mx-auto w-14 h-14 flex items-center justify-center mb-3">
                <Icon name="Phone" size={22} className="text-white" />
              </div>
              <p className="font-bold text-base mb-1">Ольга</p>
              <p className="text-primary/70 text-sm">+7 981 981-29-90</p>
            </div>
          </a>
          
          <a 
            href="tel:+79219456735" 
            className="bg-white/95 backdrop-blur-sm hover:bg-white text-primary p-5 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
          >
            <div className="text-center">
              <div className="bg-gradient-to-r from-primary to-secondary p-3 rounded-xl group-hover:scale-110 transition-transform mx-auto w-14 h-14 flex items-center justify-center mb-3">
                <Icon name="Phone" size={22} className="text-white" />
              </div>
              <p className="font-bold text-base mb-1">Вячеслав</p>
              <p className="text-primary/70 text-sm">+7 921 945-67-35</p>
            </div>
          </a>
          
          <a 
            href="https://wa.me/79819812990" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/95 backdrop-blur-sm hover:bg-white text-primary p-5 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
          >
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl group-hover:scale-110 transition-transform mx-auto w-14 h-14 flex items-center justify-center mb-3">
                <Icon name="MessageCircle" size={22} className="text-white" />
              </div>
              <p className="font-bold text-base mb-1">WhatsApp</p>
              <p className="text-green-600 text-sm font-medium">Написать</p>
            </div>
          </a>
          
          <a 
            href="https://t.me/Oli_Travel" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/95 backdrop-blur-sm hover:bg-white text-primary p-5 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
          >
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl group-hover:scale-110 transition-transform mx-auto w-14 h-14 flex items-center justify-center mb-3">
                <Icon name="Send" size={22} className="text-white" />
              </div>
              <p className="font-bold text-base mb-1">Telegram</p>
              <p className="text-blue-600 text-sm font-medium">@Oli_Travel</p>
            </div>
          </a>

          <a 
            href="https://vk.com/oli8travel" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/95 backdrop-blur-sm hover:bg-white text-primary p-5 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
          >
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-3 rounded-xl group-hover:scale-110 transition-transform mx-auto w-14 h-14 flex items-center justify-center mb-3">
                <Icon name="MessageSquare" size={22} className="text-white" />
              </div>
              <p className="font-bold text-base mb-1">ВКонтакте</p>
              <p className="text-blue-700 text-sm font-medium">Группа</p>
            </div>
          </a>

          <a 
            href="https://t.me/Oli8Travel" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/95 backdrop-blur-sm hover:bg-white text-primary p-5 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
          >
            <div className="text-center">
              <div className="bg-gradient-to-r from-sky-500 to-sky-600 p-3 rounded-xl group-hover:scale-110 transition-transform mx-auto w-14 h-14 flex items-center justify-center mb-3">
                <Icon name="Radio" size={22} className="text-white" />
              </div>
              <p className="font-bold text-base mb-1">Telegram</p>
              <p className="text-sky-600 text-sm font-medium">Канал</p>
            </div>
          </a>
        </div>

        <p className="text-white/90 text-sm">*Мы ответим в течение 15 минут</p>
      </div>
    </section>
  );
}