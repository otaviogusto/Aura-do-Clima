/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Search, 
  Palette, 
  MapPin, 
  Sun, 
  Cloud, 
  Droplets, 
  Wind, 
  Thermometer, 
  Eye, 
  CloudRain, 
  CloudSun,
  ChevronRight,
  Grid3X3,
  CloudLightning,
  CloudDrizzle,
  CloudFog,
  Snowflake,
  Sunrise,
  Sunset,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Background Images ---
import bgChuva from './imagens-de-fundo/clima_chuva.png';
import bgEnsolarado from './imagens-de-fundo/clima_ensolarado.png';
import bgIris from './imagens-de-fundo/clima_iris.png';
import bgNascerSol from './imagens-de-fundo/clima_nascer_sol.png';
import bgNeblina from './imagens-de-fundo/clima_neblina.png';
import bgNeve from './imagens-de-fundo/clima_neve.png';
import bgNoiteLua from './imagens-de-fundo/clima_noite_lua.png';
import bgPorSol from './imagens-de-fundo/clima_por_sol.png';
import bgTempestade from './imagens-de-fundo/clima_tempestade.png';
import bgVento from './imagens-de-fundo/clima_vento.png';

const BACKGROUND_IMAGES = [
  bgChuva,
  bgEnsolarado,
  bgIris,
  bgNascerSol,
  bgNeblina,
  bgNeve,
  bgNoiteLua,
  bgPorSol,
  bgTempestade,
  bgVento
];

// --- Types ---
interface WeatherData {
  city: string;
  date: string;
  temp: number;
  description: string;
  high: number;
  low: number;
  humidity: number;
  windSpeed: string;
  uvIndex: string;
  feelsLike: number;
  visibility: string;
  condition_slug: string;
}

interface ForecastDay {
  day: string;
  icon: React.ReactNode;
  high: number;
  low: number;
}

type Theme = 'manha' | 'tarde' | 'noite';

// --- Helpers ---
const getIcon = (slug: string, size = 28) => {
  switch (slug) {
    case 'storm': return <CloudLightning size={size} />;
    case 'snow': return <Snowflake size={size} />;
    case 'hail': return <CloudRain size={size} />;
    case 'rain': return <CloudRain size={size} />;
    case 'fog': return <CloudFog size={size} />;
    case 'clear_day': return <Sun size={size} />;
    case 'clear_night': return <Moon size={size} />;
    case 'cloud': return <Cloud size={size} />;
    case 'cloudly_day': return <CloudSun size={size} />;
    case 'cloudly_night': return <Cloud size={size} />;
    case 'none_day': return <Sun size={size} />;
    case 'none_night': return <Moon size={size} />;
    default: return <Cloud size={size} />;
  }
};

// --- Components ---

const Header = ({ onSearch, currentTheme, onThemeChange }: { 
  onSearch: (city: string) => void, 
  currentTheme: Theme,
  onThemeChange: (theme: Theme) => void 
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(searchValue);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between py-6 px-4 md:px-8 relative">
      <div className="text-xl font-bold tracking-tight">Aura do Clima</div>
      
      <div className="flex-1 max-w-md mx-4">
        <div className="search-bar flex items-center px-4 py-2 rounded-full">
          <Search size={18} className="text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="Buscar cidade (ex: São Paulo, SP)..." 
            className="bg-transparent border-none outline-none text-sm w-full text-white placeholder-gray-500"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      <div className="relative" ref={menuRef}>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center space-x-2 text-sm font-medium text-gray-400 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10"
        >
          <Palette size={18} />
          <span>Estilo</span>
        </button>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-40 rounded-2xl bg-gray-900 border border-white/10 shadow-2xl overflow-hidden z-50"
            >
              <button 
                onClick={() => { onThemeChange('manha'); setIsMenuOpen(false); }}
                className={`w-full px-4 py-3 text-left text-sm flex items-center space-x-3 hover:bg-white/5 transition-colors ${currentTheme === 'manha' ? 'text-blue-400' : 'text-gray-300'}`}
              >
                <Sunrise size={16} />
                <span>Manhã</span>
              </button>
              <button 
                onClick={() => { onThemeChange('tarde'); setIsMenuOpen(false); }}
                className={`w-full px-4 py-3 text-left text-sm flex items-center space-x-3 hover:bg-white/5 transition-colors ${currentTheme === 'tarde' ? 'text-orange-400' : 'text-gray-300'}`}
              >
                <Sunset size={16} />
                <span>Tarde</span>
              </button>
              <button 
                onClick={() => { onThemeChange('noite'); setIsMenuOpen(false); }}
                className={`w-full px-4 py-3 text-left text-sm flex items-center space-x-3 hover:bg-white/5 transition-colors ${currentTheme === 'noite' ? 'text-purple-400' : 'text-gray-300'}`}
              >
                <Moon size={16} />
                <span>Noite</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

const MainCard = ({ data }: { data: WeatherData }) => {
  return (
    <motion.div 
      key={data.city}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="cosmic-card weather-card p-8 flex flex-col justify-between min-h-[380px] relative"
    >
      <div>
        <div className="flex items-center text-white mb-1">
          <MapPin size={18} className="mr-2 text-blue-400" />
          <h2 id="current-city" className="text-2xl font-semibold">{data.city}</h2>
        </div>
        <p className="text-gray-400 text-sm ml-6">{data.date}</p>
      </div>

      <div className="flex items-end justify-between">
        <div className="flex items-center">
          <span id="current-temp" className="text-9xl font-light tracking-tighter">{data.temp}°</span>
          <div className="ml-6 flex flex-col items-center">
            <div className="text-yellow-400 mb-2">
              {getIcon(data.condition_slug, 48)}
            </div>
            <span className="text-lg font-medium">{data.description}</span>
          </div>
        </div>

        <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-white/10 min-w-[140px]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400 text-xs uppercase tracking-wider">Máx</span>
            <span className="font-semibold">{data.high}°</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-xs uppercase tracking-wider">Mín</span>
            <span className="font-semibold">{data.low}°</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface DetailCardProps {
  icon: React.ElementType;
  title: string;
  value: string | number;
  description: React.ReactNode;
  className?: string;
  extraIcon?: React.ElementType;
}

const DetailCard = ({ icon: Icon, title, value, description, className = "", extraIcon: ExtraIcon }: DetailCardProps) => {
  return (
    <div className={`weather-card p-5 flex flex-col justify-between relative ${className}`}>
      <div className="flex items-center text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-4">
        <Icon size={14} className="mr-2" />
        {title}
      </div>
      <div className="flex justify-between items-end">
        <div>
          <div className="text-2xl font-semibold mb-1">{value}</div>
          <div className="text-gray-500 text-[11px] leading-tight">{description}</div>
        </div>
        {ExtraIcon && <ExtraIcon size={24} className="text-gray-700" />}
      </div>
    </div>
  );
};

const ForecastCard = ({ day, icon, high, low }: ForecastDay) => {
  const dayTranslations: { [key: string]: string } = {
    'MON': 'SEG', 'TUE': 'TER', 'WED': 'QUA', 'THU': 'QUI', 'FRI': 'SEX', 'SAT': 'SÁB', 'SUN': 'DOM'
  };
  
  return (
    <div className="weather-card p-6 flex flex-col items-center justify-center text-center flex-1 min-w-[140px]">
      <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">{dayTranslations[day] || day}</span>
      <div className="mb-4 text-blue-400">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold">{high}°</span>
        <span className="text-gray-500 text-xs">{low}°</span>
      </div>
    </div>
  );
};

const BackgroundSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 10000); // Muda a cada 10 segundos
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 bg-black overflow-hidden pointer-events-none">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }} // Transparência suave
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 4, // Transição bem lenta e suave
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110" // Pequeno zoom para evitar bordas
          style={{ backgroundImage: `url(${BACKGROUND_IMAGES[currentIndex]})` }}
        />
      </AnimatePresence>
      {/* Overlay para suavizar ainda mais com o tema */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [currentData, setCurrentData] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>('noite');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const fetchWeather = useCallback(async (city?: string) => {
    setLoading(true);
    setError(null);
    try {
      const url = city ? `/api/weather?city=${encodeURIComponent(city)}` : '/api/weather';
      const response = await fetch(url);
      const data = await response.json();

      if (data.results) {
        const res = data.results;
        setCurrentData({
          city: res.city,
          date: `${res.date} - ${res.time}`,
          temp: res.temp,
          description: res.description,
          high: res.forecast[0].max,
          low: res.forecast[0].min,
          humidity: res.humidity,
          windSpeed: res.wind_speedy,
          uvIndex: "Moderado",
          feelsLike: res.temp,
          visibility: "12 km",
          condition_slug: res.condition_slug
        });

        const forecastData = res.forecast.slice(1, 6).map((f: { weekday: string; condition: string; max: number; min: number }) => ({
          day: f.weekday.toUpperCase(),
          icon: getIcon(f.condition),
          high: f.max,
          low: f.min
        }));
        setForecast(forecastData);
      } else {
        setError("Cidade não encontrada ou erro na API.");
      }
    } catch (err) {
      console.error(err);
      setError("Falha ao conectar ao serviço de clima.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  const handleSearch = (city: string) => {
    fetchWeather(city);
  };

  if (loading && !currentData) return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-400 animate-pulse">Consultando os astros...</p>
    </div>
  );

  return (
    <div className="relative min-h-screen">
      <BackgroundSlider />
      <div className="max-w-7xl mx-auto min-h-screen flex flex-col relative z-10">
      <Header onSearch={handleSearch} currentTheme={theme} onThemeChange={setTheme} />

      <main className="flex-1 p-4 md:p-8 space-y-8">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm">
            {error}
          </div>
        )}

        {currentData && (
          <>
            {/* Top Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Card */}
              <div className="lg:col-span-2">
                <MainCard data={currentData} />
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <DetailCard 
                  icon={Droplets} 
                  title="Umidade" 
                  value={`${currentData.humidity}%`} 
                  description="Nível atual de umidade do ar." 
                />
                <DetailCard 
                  icon={Wind} 
                  title="Vento" 
                  value={currentData.windSpeed} 
                  description="Velocidade e direção do vento." 
                />
                <DetailCard 
                  icon={Sun} 
                  title="Índice UV" 
                  value={currentData.uvIndex} 
                  description={
                    <div className="w-full bg-gray-800 h-1 rounded-full mt-2 overflow-hidden">
                      <div className="bg-blue-400 h-full w-1/2"></div>
                    </div>
                  } 
                />
                <DetailCard 
                  icon={Thermometer} 
                  title="Sensação" 
                  value={`${currentData.feelsLike}°`} 
                  description="Temperatura percebida pelo corpo." 
                />
                <DetailCard 
                  icon={Eye} 
                  title="Visibilidade" 
                  value={currentData.visibility} 
                  description="Visão clara do horizonte." 
                  className="col-span-2"
                  extraIcon={Grid3X3}
                />
              </div>
            </div>

            {/* Weekly Forecast */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold uppercase tracking-widest text-gray-300">Previsão Semanal</h3>
                <button className="flex items-center text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-widest">
                  Ver Detalhes <ChevronRight size={14} className="ml-1" />
                </button>
              </div>
              
              <div className="flex flex-wrap gap-4">
                {forecast.map((day, index) => (
                  <ForecastCard key={index} {...day} />
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="py-8 text-center text-gray-600 text-xs space-y-2">
        <p>
          &copy; 2026 Aura do Clima. Desenvolvido por{' '}
          <a 
            href="https://otaviogusto.netlify.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
          >
            Otávio Gusto
          </a>.
        </p>
        <p className="italic opacity-70">Soluções tecnológicas para o seu negócio.</p>
      </footer>
      </div>
    </div>
  );
}
