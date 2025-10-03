import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const months = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

const toursByMonth = [
  { month: 'Октябрь', tours: [
    { destination: 'Турция', price: 35000, discount: 15, dates: ['05.10', '12.10', '19.10', '26.10'] },
    { destination: 'ОАЭ', price: 55000, discount: 20, dates: ['10.10', '17.10', '24.10', '31.10'] },
    { destination: 'Египет', price: 40000, discount: 25, dates: ['08.10', '15.10', '22.10', '29.10'] }
  ]},
  { month: 'Ноябрь', tours: [
    { destination: 'Таиланд', price: 60000, discount: 10, dates: ['02.11', '09.11', '16.11', '23.11'] },
    { destination: 'Мальдивы', price: 120000, discount: 15, dates: ['05.11', '12.11', '19.11', '26.11'] },
    { destination: 'Шри-Ланка', price: 70000, discount: 18, dates: ['07.11', '14.11', '21.11', '28.11'] }
  ]},
  { month: 'Декабрь', tours: [
    { destination: 'Сочи', price: 25000, discount: 20, dates: ['01.12', '08.12', '15.12', '22.12'] },
    { destination: 'ОАЭ', price: 65000, discount: 12, dates: ['05.12', '12.12', '19.12', '26.12'] },
    { destination: 'Турция', price: 38000, discount: 15, dates: ['10.12', '17.12', '24.12', '31.12'] }
  ]}
];

export default function TourCalendarSection() {
  const [selectedMonth, setSelectedMonth] = useState(0);

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Icon name="Calendar" size={16} />
            Календарь туров
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            📅 Выберите дату вылета
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Посмотрите доступные туры по месяцам и выберите удобную дату
          </p>
        </div>

        {/* Выбор месяца */}
        <div className="flex overflow-x-auto gap-2 mb-8 pb-4 scrollbar-hide">
          {toursByMonth.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedMonth(index)}
              className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 ${
                selectedMonth === index
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {item.month}
            </button>
          ))}
        </div>

        {/* Туры выбранного месяца */}
        <div className="grid md:grid-cols-3 gap-6">
          {toursByMonth[selectedMonth].tours.map((tour, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-500/20"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-1">{tour.destination}</h3>
                  <div className="text-sm text-gray-500">7 ночей / 8 дней</div>
                </div>
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  -{tour.discount}%
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-1">Цена от</div>
                <div className="flex items-baseline gap-2">
                  <div className="text-3xl font-bold text-blue-600">
                    {(tour.price * (1 - tour.discount / 100)).toLocaleString()}₽
                  </div>
                  <div className="text-lg text-gray-400 line-through">
                    {tour.price.toLocaleString()}₽
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm font-semibold text-gray-700 mb-2">Даты вылета:</div>
                <div className="grid grid-cols-4 gap-2">
                  {tour.dates.map((date, i) => (
                    <button
                      key={i}
                      className="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-sm font-semibold transition-colors"
                    >
                      {date}
                    </button>
                  ))}
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-xl transition-all">
                Забронировать
              </Button>
            </div>
          ))}
        </div>

        {/* Дополнительная информация */}
        <div className="mt-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-8 text-white text-center">
          <Icon name="Info" size={40} className="mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-3">Не нашли нужную дату?</h3>
          <p className="mb-6 opacity-90">
            Мы можем подобрать тур на любую удобную для вас дату
          </p>
          <Button className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8">
            Связаться с менеджером
          </Button>
        </div>
      </div>
    </section>
  );
}
