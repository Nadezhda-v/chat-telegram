import axios, { type AxiosInstance } from 'axios';
import type { Credentials } from './types';

export const GREEN_API_URL = 'https://4100.api.green-api.com';

/**
 * Создаёт axios-клиент с базовым URL инстанса GREEN API.
 */

export function createGreenApiClient(credentials: Credentials): AxiosInstance {
  return axios.create({
    baseURL: `${GREEN_API_URL}/waInstance${credentials.idInstance}`,
    timeout: 60000,
    headers: { 'Content-Type': 'application/json' },
  });
}
