import { Cloud, CloudLightning, CloudMoon, CloudRain, CloudSun, Moon, Snowflake, Sun } from 'lucide-react';
import { type WeatherIcon as WeatherIconType } from '../../types/weather.types';

const WeatherIcon = ({ name, className }: { name: WeatherIconType; className?: string | undefined }) => {
  switch (name) {
    case 'sun':
      return <Sun className={className} />;
    case 'moon':
      return <Moon className={className} />;
    case 'cloud':
      return <Cloud className={className} />;
    case 'cloud-sun':
      return <CloudSun className={className} />;
    case 'cloud-moon':
      return <CloudMoon className={className} />;
    case 'cloud-rain':
      return <CloudRain className={className} />;
    case 'cloud-lightning':
      return <CloudLightning className={className} />;
    case 'snowflake':
      return <Snowflake className={className} />;
    default:
      return <Cloud className={className} />;
  }
};

export default WeatherIcon;
