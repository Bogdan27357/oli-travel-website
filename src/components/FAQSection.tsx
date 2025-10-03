import { useState } from 'react';
import Icon from '@/components/ui/icon';

const faqs = [
  {
    question: 'Как забронировать тур?',
    answer: 'Выберите понравившийся тур, заполните форму бронирования или свяжитесь с нами по телефону. Наш менеджер подтвердит наличие мест и поможет оформить заявку.'
  },
  {
    question: 'Какие документы нужны для выезда за границу?',
    answer: 'Для большинства стран нужен загранпаспорт, действующий минимум 6 месяцев после возвращения. Для некоторых стран требуется виза. Мы поможем с оформлением всех документов.'
  },
  {
    question: 'Можно ли отменить или изменить бронирование?',
    answer: 'Да, но условия отмены зависят от тарифа тура. При отмене за 30+ дней обычно возвращается 100% стоимости. Подробные условия уточняйте у менеджера при бронировании.'
  },
  {
    question: 'Что входит в стоимость тура?',
    answer: 'В базовую стоимость входит: перелет, проживание, трансфер аэропорт-отель-аэропорт, страховка. Питание и экскурсии зависят от выбранного пакета.'
  },
  {
    question: 'Какие способы оплаты вы принимаете?',
    answer: 'Мы принимаем оплату картами (Visa, MasterCard, МИР), банковским переводом и наличными в офисе. Доступна рассрочка до 12 месяцев.'
  },
  {
    question: 'Могу ли я оплатить тур в рассрочку?',
    answer: 'Да! Мы предлагаем рассрочку 0% на 3, 6 или 12 месяцев. Одобрение за 5 минут, минимальный пакет документов.'
  },
  {
    question: 'Как быстро нужно оплатить тур после бронирования?',
    answer: 'Бронь без оплаты держится 24 часа. Для подтверждения нужно внести предоплату 30-50% в течение 3 дней. Полная оплата за 14 дней до вылета.'
  },
  {
    question: 'Что делать если рейс задержали или отменили?',
    answer: 'Мы работаем только с надежными авиакомпаниями. В случае задержки/отмены рейса наши менеджеры помогут с перебронированием и компенсацией по страховке.'
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            ❓ Часто задаваемые вопросы
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Ответы на самые популярные вопросы о бронировании туров
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-lg pr-4">{faq.question}</span>
                <Icon
                  name={openIndex === index ? 'ChevronUp' : 'ChevronDown'}
                  size={24}
                  className={`flex-shrink-0 text-primary transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <Icon name="MessageCircle" size={48} className="mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-3">Не нашли ответ?</h3>
            <p className="text-gray-600 mb-6">
              Наши специалисты готовы ответить на любые вопросы
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="tel:+78123456789"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                <Icon name="Phone" size={20} />
                +7 (812) 345-67-89
              </a>
              <a
                href="#chat"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
              >
                <Icon name="MessageSquare" size={20} />
                Онлайн-чат
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
