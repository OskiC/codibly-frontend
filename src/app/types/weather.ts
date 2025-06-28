export interface DailyWeather{
    date: string;
    weatherCode: number;
    temperatureMin: number;
    temperatureMax: number;
    sunshineDuration: number;
    estimatedEnergy: number;
}

export interface WeeklySummary{
    averagePressure: number;
    averageSunshineDurationSeconds: number;
    minTemperature: number;
    maxTemperature: number;
    weatherSummary: string;
}