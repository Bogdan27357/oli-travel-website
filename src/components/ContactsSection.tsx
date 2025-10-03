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
        
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
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
        </div>

        <p className="text-white/90 text-sm">*Мы ответим в течение 15 минут</p>
      </div>
    </section>
  );
}