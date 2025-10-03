import { Card } from '@/components/ui/card';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            О нас
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            OliTravel — ваш надежный партнер в мире путешествий с 2010 года
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="p-8 text-center border-0 bg-gradient-to-br from-primary/5 to-secondary/5">
            <div className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">14+</div>
            <p className="text-gray-600 font-medium">лет на рынке</p>
          </Card>
          <Card className="p-8 text-center border-0 bg-gradient-to-br from-primary/5 to-secondary/5">
            <div className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">50K+</div>
            <p className="text-gray-600 font-medium">довольных клиентов</p>
          </Card>
          <Card className="p-8 text-center border-0 bg-gradient-to-br from-primary/5 to-secondary/5">
            <div className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">120+</div>
            <p className="text-gray-600 font-medium">направлений</p>
          </Card>
        </div>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Мы специализируемся на организации незабываемых путешествий из Санкт-Петербурга. 
            Наша команда профессионалов поможет подобрать идеальный тур, учитывая все ваши пожелания и бюджет.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            С нами вы получаете гарантию качества, лучшие цены и круглосуточную поддержку на всех этапах путешествия.
          </p>
        </div>
      </div>
    </section>
  );
}
