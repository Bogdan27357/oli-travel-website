import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            О нас
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            💥 Турагентство OliTravel
          </p>
        </div>

        <div className="max-w-6xl mx-auto mb-12">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div className="order-2 md:order-1">
                <div className="flex items-center gap-3 mb-6">
                  <Icon name="Award" size={32} className="text-primary" />
                  <h3 className="text-2xl font-bold">💯 12 ЛЕТ БЕЗУПРЕЧНОЙ РАБОТЫ</h3>
                </div>
                
                <div className="space-y-4 mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    <strong className="text-primary">Мы работаем только с надежными туроператорами:</strong> БИБЛИО-ГЛОБУС, ПЕГАС, КОРАЛ, ANEX, FUN & SUN, АЛЕАН, РУССКИЙ ЭКСПРЕСС, СПЭЙС ТРЭВЕЛ и многими другими.
                  </p>

                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-xl">
                    <p className="font-semibold text-gray-800 mb-2">📞 ЗВОНИТЕ:</p>
                    <div className="space-y-1">
                      <a href="tel:+79819812990" className="flex items-center gap-2 text-primary hover:underline">
                        <Icon name="Phone" size={16} />
                        <span>8 981 981 29 90 - Ольга</span>
                      </a>
                      <a href="tel:+79219456735" className="flex items-center gap-2 text-primary hover:underline">
                        <Icon name="Phone" size={16} />
                        <span>8 921 945 67 35 - Вячеслав</span>
                      </a>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-xl">
                    <p className="font-semibold mb-2">💫 Подписывайтесь на нашу группу:</p>
                    <a 
                      href="https://vk.com/oli8travel" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <Icon name="Users" size={16} />
                      vk.com/oli8travel - Выгодные путешествия!
                    </a>
                  </div>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <img 
                  src="https://cdn.poehali.dev/files/fbe2388b-fe3c-4d3f-a9eb-1801160f221c.jpg"
                  alt="Команда OliTravel"
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Наше турагентство – это не просто агентство по продаже путевок, это команда опытных путешественников и профессионалов, готовых воплотить ваши мечты в реальность. Мы предлагаем широкий спектр услуг, от классического пляжного отдыха до экстремальных приключений и познавательных экскурсий.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-6xl mx-auto">
          <Card className="p-6 border-0 bg-white shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Icon name="Sparkles" className="text-primary" />
              Что мы предлагаем:
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Индивидуальный подход:</strong> Учитываем все ваши пожелания и предпочтения, создавая уникальные туры</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Широкий выбор направлений:</strong> От экзотических островов до исторических городов</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Высокое качество сервиса:</strong> Работаем только с проверенными партнерами</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Профессиональная консультация:</strong> Поможем выбрать оптимальный маршрут и отель</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Удобный онлайн-сервис:</strong> Бронирование и вся информация на сайте</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Специальные предложения:</strong> Регулярные акции и скидки</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6 border-0 bg-white shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Icon name="Star" className="text-secondary" />
              Почему стоит выбрать нас?
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Icon name="CheckCircle" size={20} className="text-secondary mt-0.5 flex-shrink-0" />
                <span><strong>Опыт и профессионализм:</strong> Многолетний опыт работы в туризме</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="CheckCircle" size={20} className="text-secondary mt-0.5 flex-shrink-0" />
                <span><strong>Доверие и надежность:</strong> Честная и прозрачная работа</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="CheckCircle" size={20} className="text-secondary mt-0.5 flex-shrink-0" />
                <span><strong>Индивидуальный подход:</strong> Ваши пожелания – наш приоритет</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="CheckCircle" size={20} className="text-secondary mt-0.5 flex-shrink-0" />
                <span><strong>Лучшие цены:</strong> Конкурентоспособные цены на все услуги</span>
              </li>
            </ul>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
            С нами ваше путешествие станет незабываемым! ❤️
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="tel:+79819812990">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:shadow-xl transition-all">
                <Icon name="Phone" className="mr-2" />
                Связаться с нами
              </Button>
            </a>
            <a href="https://vk.com/oli8travel" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white">
                <Icon name="Users" className="mr-2" />
                Группа ВКонтакте
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
