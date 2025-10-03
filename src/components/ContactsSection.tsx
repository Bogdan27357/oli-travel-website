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
        
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <a 
            href="tel:+79819812990" 
            className="bg-white/95 backdrop-blur-sm hover:bg-white text-primary p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
          >
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-primary to-secondary p-3 rounded-xl group-hover:scale-110 transition-transform">
                <Icon name="Phone" size={24} className="text-white" />
              </div>
              <div className="text-left">
                <p className="font-bold text-lg">Ольга</p>
                <p className="text-primary/70">+7 981 981-29-90</p>
              </div>
            </div>
          </a>
          
          <a 
            href="tel:+79219456735" 
            className="bg-white/95 backdrop-blur-sm hover:bg-white text-primary p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
          >
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-primary to-secondary p-3 rounded-xl group-hover:scale-110 transition-transform">
                <Icon name="Phone" size={24} className="text-white" />
              </div>
              <div className="text-left">
                <p className="font-bold text-lg">Вячеслав</p>
                <p className="text-primary/70">+7 921 945-67-35</p>
              </div>
            </div>
          </a>
          
          <a 
            href="https://vk.com/travelpetergof" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/95 backdrop-blur-sm hover:bg-white text-primary p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
          >
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-primary to-secondary p-3 rounded-xl group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.15 12.3c.27.48.04.7-.4.7h-1.32c-.67 0-.87-.53-2.07-1.73-1.04-1.04-1.5-1.18-1.76-1.18-.36 0-.46.1-.46.58v1.58c0 .43-.14.69-1.26.69-1.86 0-3.93-1.13-5.39-3.24-2.19-3.15-2.79-5.52-2.79-6 0-.26.1-.5.58-.5h1.32c.43 0 .59.2.76.66.84 2.45 2.25 4.59 2.83 4.59.22 0 .32-.1.32-.65v-2.54c-.07-1.15-.67-1.25-.67-1.66 0-.21.17-.42.45-.42h2.07c.36 0 .49.19.49.6v3.43c0 .36.16.49.26.49.22 0 .4-.13.8-.53 1.24-1.39 2.13-3.54 2.13-3.54.12-.25.31-.5.74-.5h1.32c.53 0 .65.27.53.64-.21.92-2.37 3.88-2.37 3.88-.18.3-.25.43 0 .77z"/>
                </svg>
              </div>
              <div className="text-left">
                <p className="font-bold text-lg">ВКонтакте</p>
                <p className="text-primary/70">Наша группа</p>
              </div>
            </div>
          </a>
        </div>

        <p className="text-white/90 text-sm">*Мы ответим в течение 15 минут</p>
      </div>
    </section>
  );
}