"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { DailyWeather, WeeklySummary } from "./types/weather";
import { getCurrentPosition } from "./utils/location";
import FooterSummary from "./components/footer-summary";
import WeatherTable from "./components/weather-table";
import ThemeToggle from "./components/theme-toggle";

const LocationMap = dynamic(() => import("./components/map-component"), {
  ssr: false,
});

const CRACOW_COORDS = { latitude: 50.0647, longitude: 19.9450 };

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BACKEND_BASE_URL?.replaceAll("","");

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [dailyWeather, setDailyWeather] = useState<DailyWeather[]>([]);
  const [summary, setSummary] = useState<WeeklySummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const [locationLoading, setLocationLoading] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkTheme);
    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, [isDarkTheme]);

  useEffect(() => {
    let isActive = true;

    const updateLocationAndWeather = async () => {
      setLocationLoading(true);
      try {
        const coords = await getCurrentPosition();
        if (isActive) {
          setLat(coords.latitude);
          setLon(coords.longitude);
          await fetchWeather(coords.latitude, coords.longitude);
        }
      } catch {
        if (isActive) {
          setLat(CRACOW_COORDS.latitude);
          setLon(CRACOW_COORDS.longitude);
          await fetchWeather(CRACOW_COORDS.latitude, CRACOW_COORDS.longitude);
        }
      } finally {
        if (isActive) {
          setLocationLoading(false);
        }
      }
    };

    updateLocationAndWeather();

    return () => {
      isActive = false;
    };
  }, []);

  const fetchWeather = async (latitude: number, longitude: number) => {
    setLoading(true);
    setError(null);
    try {
      const responseForecast = await fetch(
        `${API_BASE_URL}/forecast?latitude=${latitude}&longitude=${longitude}`
      );
      if (!responseForecast.ok) {
        throw new Error("Failed to fetch daily forecast");
      }
      const forecastData: DailyWeather[] = await responseForecast.json();

      const responseSummary = await fetch(
        `${API_BASE_URL}/forecast/summary?latitude=${latitude}&longitude=${longitude}`
      );
      if (!responseSummary.ok) {
        throw new Error("Failed to fetch summary");
      }
      const summaryData: WeeklySummary = await responseSummary.json();

      setDailyWeather(forecastData);
      setSummary(summaryData);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationChange = (latitude: number, longitude: number) => {
    setLat(latitude);
    setLon(longitude);
    fetchWeather(latitude, longitude);
  };

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  return (
    <main className="min-h-screen p-6">
      <div className="flex justify-end mb-4">
        <ThemeToggle isDarkTheme={isDarkTheme} onToggle={toggleTheme} />
      </div>
      <h1 className="text-3xl font-bold mb-4">7-Day Weather Forecast</h1>

      {locationLoading ? (
        <p>Loading location...</p>
      ) : lat !== null && lon !== null ? (
        <LocationMap
          key={`${lat}-${lon}`} // Force re-render with new coordinates
          initialPosition={[lat, lon]}
          onLocationChange={handleLocationChange}
        />
      ) : (
        <p>Unable to load location. Using default: Cracow.</p>
      )}

      {loading && <p>Loading weather data...</p>}
      {error && <p className={`text-red-600 ${isDarkTheme ? 'text-red-400' : ''}`}>{error}</p>}
      {!loading && !error && (
        <>
          <WeatherTable dailyWeather={dailyWeather} />
          <FooterSummary summary={summary} />
        </>
      )}
    </main>
  );
}