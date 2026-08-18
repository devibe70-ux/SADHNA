export interface SolarTimings {
  sunrise: Date;
  sunset: Date;
  solarNoon: Date;
  brahmaStart: Date;
  brahmaEnd: Date;
  abhijitStart: Date;
  abhijitEnd: Date;
  formattedBrahma: string;
  formattedSunrise: string;
  formattedSunset: string;
  formattedAbhijit: string;
}

/**
 * Calculates Solar and Vedic auspicious timings for a given latitude, longitude, and date.
 * Uses solar elevation algorithm approximation.
 */
export function calculateSolarTimings(lat: number = 28.6139, lng: number = 77.2090, date: Date = new Date()): SolarTimings {
  const dayOfYear = getDayOfYear(date);
  
  // Declination of the sun (approximate)
  const declination = 23.45 * Math.sin((284 + dayOfYear) * (365 / 360) * (Math.PI / 180));
  
  // Equation of time (approximate in minutes)
  const b = (360 / 365) * (dayOfYear - 81) * (Math.PI / 180);
  const eqTime = 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);

  // Timezone offset in hours
  const tzOffsetHours = -date.getTimezoneOffset() / 60;
  
  // Solar noon calculation
  const longitudeHour = lng / 15;
  const solarNoonDecimal = 12 - (longitudeHour - tzOffsetHours) - (eqTime / 60);

  // Hour angle for sunrise/sunset
  const latRad = lat * (Math.PI / 180);
  const decRad = declination * (Math.PI / 180);
  const cosHourAngle = -Math.tan(latRad) * Math.tan(decRad);
  
  // Clamp for polar regions
  const clampedCos = Math.max(-1, Math.min(1, cosHourAngle));
  const hourAngleDeg = Math.acos(clampedCos) * (180 / Math.PI);
  const hourAngleHours = hourAngleDeg / 15;

  const sunriseDecimal = solarNoonDecimal - hourAngleHours;
  const sunsetDecimal = solarNoonDecimal + hourAngleHours;

  const sunrise = decimalHoursToDate(date, sunriseDecimal);
  const sunset = decimalHoursToDate(date, sunsetDecimal);
  const solarNoon = decimalHoursToDate(date, solarNoonDecimal);

  // 1 Muhurta = 48 minutes
  // Brahma Muhurta starts 2 Muhurtas (96 mins) before sunrise and ends 1 Muhurta (48 mins) before sunrise.
  const brahmaStart = new Date(sunrise.getTime() - 96 * 60 * 1000);
  const brahmaEnd = new Date(sunrise.getTime() - 48 * 60 * 1000);

  // Abhijit Muhurta is centered around Solar Noon (24 mins before to 24 mins after)
  const abhijitStart = new Date(solarNoon.getTime() - 24 * 60 * 1000);
  const abhijitEnd = new Date(solarNoon.getTime() + 24 * 60 * 1000);

  const fmt: Intl.DateTimeFormatOptions = { hour: "numeric", minute: "2-digit", hour12: true };

  return {
    sunrise,
    sunset,
    solarNoon,
    brahmaStart,
    brahmaEnd,
    abhijitStart,
    abhijitEnd,
    formattedBrahma: `${brahmaStart.toLocaleTimeString([], fmt)} – ${brahmaEnd.toLocaleTimeString([], fmt)}`,
    formattedSunrise: sunrise.toLocaleTimeString([], fmt),
    formattedSunset: sunset.toLocaleTimeString([], fmt),
    formattedAbhijit: `${abhijitStart.toLocaleTimeString([], fmt)} – ${abhijitEnd.toLocaleTimeString([], fmt)}`,
  };
}

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

function decimalHoursToDate(baseDate: Date, decimalHours: number): Date {
  const d = new Date(baseDate);
  const hours = Math.floor(decimalHours);
  const minutes = Math.floor((decimalHours - hours) * 60);
  const seconds = Math.floor((((decimalHours - hours) * 60) - minutes) * 60);
  d.setHours(hours, minutes, seconds, 0);
  return d;
}

export const POPULAR_CITIES = [
  { name: "Varanasi, India", lat: 25.3176, lng: 82.9739 },
  { name: "Rishikesh, India", lat: 30.0869, lng: 78.2676 },
  { name: "New Delhi, India", lat: 28.6139, lng: 77.2090 },
  { name: "Bengaluru, India", lat: 12.9716, lng: 77.5946 },
  { name: "Mumbai, India", lat: 19.0760, lng: 72.8777 },
  { name: "London, UK", lat: 51.5074, lng: -0.1278 },
  { name: "New York, USA", lat: 40.7128, lng: -74.0060 },
  { name: "San Francisco, USA", lat: 37.7749, lng: -122.4194 },
  { name: "Sydney, Australia", lat: -33.8688, lng: 151.2093 },
  { name: "Tokyo, Japan", lat: 35.6762, lng: 139.6503 }
];
