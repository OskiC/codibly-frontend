"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mapWeatherCodeToIcon } from "../utils/icon-mapper";
import { DailyWeather } from "../types/weather";

interface WeatherTableProps {
  dailyWeather: DailyWeather[];
}

const WeatherTable: React.FC<WeatherTableProps> = ({ dailyWeather }) => {
  const getDayOfWeek = (dateStr: string) => {
    const [day, month, year] = dateStr.split('/');
    const date = new Date(`${year}-${month}-${day}`);
    return date.toLocaleDateString('pl-PL', { weekday: 'long' });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Weather Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-4 text-center">
          {dailyWeather.map((day) => (
            <div key={day.date} className="flex flex-col items-center">
              <div>{day.date} ({getDayOfWeek(day.date)})</div>
              <div>
                <FontAwesomeIcon icon={mapWeatherCodeToIcon(day.weatherCode) as IconProp} size="2x" />
              </div>
              <div>
                {day.temperatureMin.toFixed(1)}°C - {day.temperatureMax.toFixed(1)}°C
              </div>
              <div>{day.estimatedEnergy.toFixed(1)} kWh</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherTable;