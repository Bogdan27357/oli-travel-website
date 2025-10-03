import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import BookingModal from './BookingModal';

const toursByMonth = [
  { month: 'Октябрь', tours: [
    { 
      destination: 'Турция', 
      hotel: 'Rixos Premium Belek 5*',
      price: 35000, 
      discount: 15, 
      dates: ['05.10', '12.10', '19.10', '26.10'],
      duration: '7 ночей / 8 дней'
    },
    { 
      destination: 'ОАЭ', 
      hotel: 'Rixos The Palm Dubai 5*',
      price: 55000, 
      discount: 20, 
      dates: ['10.10', '17.10', '24.10', '31.10'],
      duration: '7 ночей / 8 дней'
    },
    { 
      destination: 'Египет', 
      hotel: 'Jaz Aquamarine Resort 5*',
      price: 40000, 
      discount: 25, 
      dates: ['08.10', '15.10', '22.10', '29.10'],
      duration: '7 ночей / 8 дней'
    }
  ]},
  { month: 'Ноябрь', tours: [
    { 
      destination: 'Таиланд', 
      hotel: 'Novotel Phuket Resort 4*',
      price: 65000, 
      discount: 10, 
      dates: ['02.11', '09.11', '16.11', '23.11'],
      duration: '10 ночей / 11 дней'
    },
    { 
      destination: 'Мальдивы', 
      hotel: 'Centara Ras Fushi Resort 4*',
      price: 135000, 
      discount: 12, 
      dates: ['05.11', '12.11', '19.11', '26.11'],
      duration: '7 ночей / 8 дней'
    },
    { 
      destination: 'Вьетнам', 
      hotel: 'Vinpearl Resort Nha Trang 5*',
      price: 58000, 
      discount: 15, 
      dates: ['07.11', '14.11', '21.11', '28.11'],
      duration: '9 ночей / 10 дней'
    }
  ]},
  { month: 'Декабрь', tours: [
    { 
      destination: 'Сочи', 
      hotel: 'Radisson Rosa Khutor 5*',
      price: 28000, 
      discount: 20, 
      dates: ['01.12', '08.12', '15.12', '22.12'],
      duration: '5 ночей / 6 дней'
    },
    { 
      destination: 'ОАЭ', 
      hotel: 'Atlantis The Palm 5*',
      price: 72000, 
      discount: 10, 
      dates: ['05.12', '12.12', '19.12', '26.12'],
      duration: '7 ночей / 8 дней'
    },
    { 
      destination: 'Турция', 
      hotel: 'Granada Luxury Belek 5*',
      price: 42000, 
      discount: 15, 
      dates: ['10.12', '17.12', '24.12', '31.12'],
      duration: '7 ночей / 8 дней'
    }
  ]}
];

export default function TourCalendarSection() {
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState<{
    title: string;
    hotel: string;
    duration: string;
    dates: string;
    price: number;
  } | null>(null);

  const handleBooking = (tour: typeof toursByMonth[0]['tours'][0], date: string) => {
    const discountedPrice = Math.round(tour.price * (1 - tour.discount / 100));
    setSelectedTour({
      title: tour.destination,
      hotel: tour.hotel,
      duration: tour.duration,
      dates: date,
      price: discountedPrice
    });
    setIsModalOpen(true);
  };

  const handleMainBooking = (tour: typeof toursByMonth[0]['tours'][0]) => {
    const discountedPrice = Math.round(tour.price * (1 - tour.discount / 100));
    setSelectedTour({
      title: tour.destination,
      hotel: tour.hotel,
      duration: tour.duration,
      dates: tour.dates[0],
      price: discountedPrice
    });
    setIsModalOpen(true);
  };

  const handleContactManager = () => {
    const contactSection = document.getElementById('contacts');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
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

          <div className="grid md:grid-cols-3 gap-6">
            {toursByMonth[selectedMonth].tours.map((tour, idx) => {
              const discountedPrice = Math.round(tour.price * (1 - tour.discount / 100));
              
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-500/20"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{tour.destination}</h3>
                      <div className="text-sm text-gray-500">{tour.duration}</div>
                      <div className="text-xs text-gray-400 mt-1">{tour.hotel}</div>
                    </div>
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      -{tour.discount}%
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm text-gray-500 mb-1">Цена от</div>
                    <div className="flex items-baseline gap-2">
                      <div className="text-3xl font-bold text-blue-600">
                        {discountedPrice.toLocaleString()}₽
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
                          onClick={() => handleBooking(tour, date)}
                          className="px-3 py-2 bg-blue-50 hover:bg-blue-500 hover:text-white text-blue-600 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105"
                        >
                          {date}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={() => handleMainBooking(tour)}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-xl transition-all"
                  >
                    Забронировать
                  </Button>
                </div>
              );
            })}
          </div>

          <div className="mt-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-8 text-white text-center">
            <Icon name="Info" size={40} className="mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">Не нашли нужную дату?</h3>
            <p className="mb-6 opacity-90">
              Мы можем подобрать тур на любую удобную для вас дату
            </p>
            <Button 
              onClick={handleContactManager}
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8"
            >
              Связаться с менеджером
            </Button>
          </div>
        </div>
      </section>

      <BookingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tourData={selectedTour}
      />
    </>
  );
}
