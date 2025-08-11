import type { WeatherForecast } from '../types/link.service.types';

const API_URL = import.meta.env.VITE_API_URL || 'https://localhost:7096';

export const getWeatherForecast = async () => {
  try {
    const response = await fetch(`${API_URL}/WeatherForecast`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = (await response.json()) as WeatherForecast[];
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching data: ', error.message);
    } else {
      console.error('Error fetching data: ', error);
    }
    return [];
  }
};
