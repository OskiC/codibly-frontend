"use client";

import { WeeklySummary } from "../types/weather";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FooterSummaryProps {
  summary: WeeklySummary | null;
}

export default function FooterSummary({ summary }: FooterSummaryProps) {
  if (!summary) return null;

  return (
    <Card className="mt-6 max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Weekly Summary</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div>Average Pressure: <strong>{summary.averagePressure.toFixed(2) ?? "-"} hPa</strong></div>
        <div>Average Sunshine Duration: <strong>{(summary.averageSunshineDurationSeconds / 3600).toFixed(2) ?? "-"} h</strong></div>
        <div>Min Temperature: <strong>{summary.minTemperature.toFixed(1) ?? "-"} °C</strong></div>
        <div>Max Temperature: <strong>{summary.maxTemperature.toFixed(1) ?? "-"} °C</strong></div>
        <div>Summary: <strong>{summary.weatherSummary ?? "-"}</strong></div>
      </CardContent>
    </Card>
  );
}
