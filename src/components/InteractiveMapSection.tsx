import { useState } from 'react';
import Icon from '@/components/ui/icon';

const regions = [
  {
    name: 'Европа',
    countries: ['Испания', 'Италия', 'Франция', 'Греция', 'Кипр'],
    tours: 245,
    priceFrom: 45000,
    icon: '🇪🇺',
    color: 'from-blue-500 to-cyan-500',
    position: 'top-1/4 left-1/3'
  },
  {
    name: 'Азия',
    countries: ['Таиланд', 'ОАЭ', 'Мальдивы', 'Китай', 'Япония'],
    tours: 189,
    priceFrom: 55000,
    icon: '🌏',
    color: 'from-orange-500 to-red-500',
    position: 'top-1/3 right-1/4'
  },
  {
    name: 'Африка',
    countries: ['Египет', 'Тунис', 'Марокко', 'ЮАР'],
    tours: 98,
    priceFrom: 40000,
    icon: '🌍',
    color: 'from-yellow-500 to-orange-600',
    position: 'bottom-1/3 left-1/3'
  },
  {
    name: 'Америка',
    countries: ['США', 'Мексика', 'Куба', 'Доминикана'],
    tours: 67,
    priceFrom: 85000,
    icon: '🌎',
    color: 'from-green-500 to-emerald-600',
    position: 'top-1/2 left-1/4'
  },
  {
    name: 'Россия и СНГ',
    countries: ['Сочи', 'Крым', 'Казань', 'Байкал'],
    tours: 156,
    priceFrom: 20000,
    icon: '🇷🇺',
    color: 'from-red-500 to-pink-600',
    position: 'top-1/4 right-1/3'
  }
];

export default function InteractiveMapSection() {
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Icon name="Globe" size={16} />
            Карта направлений
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            🗺️ Выберите направление на карте
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Интерактивная карта мира с доступными турами по регионам
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Карта мира */}
          <div className="relative bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl p-8 aspect-video shadow-2xl">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjA1Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
            
            {/* Интерактивные точки на карте */}
            {regions.map((region, index) => (
              <button
                key={index}
                onClick={() => setSelectedRegion(index)}
                className={`absolute ${region.position} transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                  selectedRegion === index ? 'scale-125 z-20' : 'scale-100 hover:scale-110'
                }`}
              >
                <div className={`relative group`}>
                  {/* Пульсирующий круг */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${region.color} rounded-full opacity-20 animate-ping`}></div>
                  
                  {/* Основная точка */}
                  <div className={`relative w-16 h-16 bg-gradient-to-br ${region.color} rounded-full flex items-center justify-center text-3xl shadow-xl border-4 border-white`}>
                    {region.icon}
                  </div>

                  {/* Подсказка */}
                  <div className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}>
                    <div className="text-sm font-bold">{region.name}</div>
                    <div className="text-xs text-gray-500">{region.tours} туров</div>
                  </div>
                </div>
              </button>
            ))}

            {/* Легенда */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="text-xs font-semibold text-gray-600 mb-2">Нажмите на регион</div>
              <div className="flex items-center gap-2 text-sm">
                <Icon name="MousePointer2" size={16} className="text-blue-500" />
                <span className="text-gray-700">для подробностей</span>
              </div>
            </div>
          </div>

          {/* Информация о выбранном регионе */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            {selectedRegion !== null ? (
              <div className="p-8">
                <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${regions[selectedRegion].color} rounded-full flex items-center justify-center text-5xl shadow-xl`}>
                  {regions[selectedRegion].icon}
                </div>

                <h3 className="text-3xl font-bold text-center mb-2">{regions[selectedRegion].name}</h3>
                
                <div className="flex justify-center gap-6 mb-6 text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Icon name="MapPin" size={16} />
                    <span>{regions[selectedRegion].tours} туров</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Icon name="DollarSign" size={16} />
                    <span>от {regions[selectedRegion].priceFrom.toLocaleString()}₽</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-3">Популярные страны:</h4>
                  <div className="flex flex-wrap gap-2">
                    {regions[selectedRegion].countries.map((country, idx) => (
                      <span
                        key={idx}
                        className={`px-4 py-2 bg-gradient-to-r ${regions[selectedRegion].color} text-white rounded-lg font-medium shadow-md hover:shadow-xl transition-all cursor-pointer hover:scale-105`}
                      >
                        {country}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">{regions[selectedRegion].tours}</div>
                    <div className="text-xs text-gray-600">туров</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">{regions[selectedRegion].countries.length}</div>
                    <div className="text-xs text-gray-600">стран</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-orange-600">4.8</div>
                    <div className="text-xs text-gray-600">рейтинг</div>
                  </div>
                </div>

                <button className={`w-full py-4 bg-gradient-to-r ${regions[selectedRegion].color} text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105`}>
                  Смотреть туры в {regions[selectedRegion].name}
                </button>
              </div>
            ) : (
              <div className="p-12 text-center">
                <Icon name="MousePointer2" size={64} className="mx-auto mb-6 text-gray-300" />
                <h3 className="text-2xl font-bold text-gray-400 mb-2">
                  Выберите регион на карте
                </h3>
                <p className="text-gray-500">
                  Нажмите на любую точку, чтобы увидеть доступные направления
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Статистика */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-8 text-white">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <Icon name="Globe" size={40} className="mx-auto mb-3 opacity-80" />
              <div className="text-4xl font-bold mb-1">120+</div>
              <div className="text-sm opacity-90">стран мира</div>
            </div>
            <div>
              <Icon name="MapPin" size={40} className="mx-auto mb-3 opacity-80" />
              <div className="text-4xl font-bold mb-1">500+</div>
              <div className="text-sm opacity-90">городов</div>
            </div>
            <div>
              <Icon name="Package" size={40} className="mx-auto mb-3 opacity-80" />
              <div className="text-4xl font-bold mb-1">755</div>
              <div className="text-sm opacity-90">туров</div>
            </div>
            <div>
              <Icon name="Star" size={40} className="mx-auto mb-3 opacity-80" />
              <div className="text-4xl font-bold mb-1">4.9</div>
              <div className="text-sm opacity-90">средний рейтинг</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
