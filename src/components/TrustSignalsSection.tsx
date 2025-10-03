import Icon from '@/components/ui/icon';

const certifications = [
  {
    icon: 'Shield',
    title: 'Реестр туроператоров',
    description: 'РТО 012345',
    badge: '✓ Проверено'
  },
  {
    icon: 'FileCheck',
    title: 'Финансовая гарантия',
    description: '100 млн ₽',
    badge: 'Застрахованы'
  },
  {
    icon: 'Award',
    title: 'Лучший туроператор',
    description: '2024 года',
    badge: 'Победитель'
  },
  {
    icon: 'Users',
    title: 'Турпомощь 24/7',
    description: 'По всему миру',
    badge: 'Всегда на связи'
  }
];

const paymentMethods = [
  { name: 'Visa', logo: '💳' },
  { name: 'MasterCard', logo: '💳' },
  { name: 'МИР', logo: '💳' },
  { name: 'Рассрочка 0%', logo: '📊' },
  { name: 'Безналичный расчет', logo: '🏦' }
];

export default function TrustSignalsSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Сертификаты и гарантии */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center border-2 border-transparent hover:border-primary/20"
            >
              <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <Icon name={cert.icon as any} size={28} className="text-white" />
              </div>
              <div className="text-xs text-primary font-semibold mb-2 bg-primary/10 inline-block px-3 py-1 rounded-full">
                {cert.badge}
              </div>
              <h3 className="font-bold text-sm mb-1">{cert.title}</h3>
              <p className="text-gray-600 text-sm">{cert.description}</p>
            </div>
          ))}
        </div>

        {/* Способы оплаты */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">Принимаем к оплате</h3>
            <p className="text-gray-600">Выберите удобный способ оплаты</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {paymentMethods.map((method, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-gray-50 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
              >
                <span className="text-2xl">{method.logo}</span>
                <span className="font-semibold text-sm">{method.name}</span>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-4 text-center text-sm">
            <div className="flex items-center justify-center gap-2 text-green-600">
              <Icon name="Lock" size={16} />
              <span>Безопасные платежи</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-blue-600">
              <Icon name="RefreshCw" size={16} />
              <span>Возврат 100%</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-purple-600">
              <Icon name="Percent" size={16} />
              <span>Рассрочка 0%</span>
            </div>
          </div>
        </div>

        {/* Партнеры */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm mb-4">Наши партнеры:</p>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-60 grayscale hover:grayscale-0 transition-all">
            <div className="text-2xl font-bold">Аэрофлот</div>
            <div className="text-2xl font-bold">S7</div>
            <div className="text-2xl font-bold">Победа</div>
            <div className="text-2xl font-bold">Уральские авиалинии</div>
          </div>
        </div>
      </div>
    </section>
  );
}
