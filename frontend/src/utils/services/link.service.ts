import { SERVER_URL_LOCALHOST_NOT_REAL } from '../../constants/constants';

export type Link = {
  id: string;
  originalURL: string;
  secretURL: string;
  created: string;
  timesOpened: number;
  visitorsIp: { key: string; value: number };
};

export type CreateLinkResponse = {
  originalURL: string;
  shortURL: string;
  secretURL: string;
};

export type GetSecretUrl = {
  originalURL: string;
  shortURL: string;
  visitorsIp: { [key: string]: number };
};

const API_URL = import.meta.env.VITE_API_URL || SERVER_URL_LOCALHOST_NOT_REAL;

export const getShortUrl = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/api/Links/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = (await response.json()) as { originalUrl: string };
    return data.originalUrl;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching data: ', error.message);
    } else {
      console.error('Error fetching data: ', error);
    }
    return { originalUrl: '' };
  }
};

export const getSecretUrl = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/api/Links/Secret/${id}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = (await response.json()) as GetSecretUrl;

    return data as GetSecretUrl;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching data: ', error.message);
    } else {
      console.error('Error fetching data: ', error);
    }
    return {
      originalURL: 'Error',
      shortURL: 'Error',
      visitorsIp: [{ key: 'Error', value: 0 }],
    };
  }
};

export const postCreateLink = async (originalUrl: string) => {
  try {
    const response = await fetch(`${API_URL}/api/Links`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(originalUrl),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data as CreateLinkResponse;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching data: ', error.message);
    } else {
      console.error('Error fetching data: ', error);
    }
    return { id: '' };
  }
};
