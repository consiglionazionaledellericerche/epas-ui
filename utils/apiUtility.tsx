import { getSession } from 'next-auth/react';
import { CustomSession } from '../types/customSession';
import DateUtility from "../utils/dateUtility";

// Funzione per costruire la query string da un oggetto params
const buildQueryString = (params:{ [key: string]: string | number | boolean }) => {
  return Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
};

export const secureCheck = async (params:any, setMethod:any) => {
  const session = await getSession();
  let accessToken = session?.accessToken || null;

  const queryString = buildQueryString(params);
  const url = `/api/rest/v4/secure/check?${queryString}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Errore durante la richiesta API');
    }

    const data = await response.json();
    setMethod(data);
  } catch (error) {
    console.error("unable to achieve this", error);
  }
};
