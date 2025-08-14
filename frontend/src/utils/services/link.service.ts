const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export const getShortUrl = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/api/Links/${id}`, {
      method: 'GET',
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
      console.log(response);

      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.id;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching data: ', error.message);
    } else {
      console.error('Error fetching data: ', error);
    }
    return { id: '' };
  }
};
