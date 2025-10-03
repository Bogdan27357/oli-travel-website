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
        <p className="text-xl mb-10 opacity-95 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          Оставьте заявку и наш менеджер свяжется с вами в течение 15 минут
        </p>
        <Button 
          size="lg" 
          className="bg-white text-primary hover:bg-gray-100 shadow-2xl transition-all duration-300 hover:scale-110 text-lg px-10 py-7 animate-scale-in"
          style={{ animationDelay: '200ms' }}
        >
          <Icon name="Phone" className="mr-2" size={20} />
          Получить консультацию
        </Button>
      </div>
    </section>
  );
}
