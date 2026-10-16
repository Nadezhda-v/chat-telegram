import axios from 'axios';
import { createGreenApiClient } from '@/shared/api/client';
import { toGreenApiError } from '@/shared/api/errors';
import type { Credentials, ReceiveNotificationResponse } from '@/shared/api/types';

/**
 * Забирает одно входящее уведомление из очереди (long polling).
 * Метод: GET /receiveNotification/{apiTokenInstance}?receiveTimeout={seconds}
 */
export async function receiveNotification(
  credentials: Credentials,
  signal?: AbortSignal,
  receiveTimeout = 20,
): Promise<ReceiveNotificationResponse | null> {
  const client = createGreenApiClient(credentials);

  try {
    const { data } = await client.get<ReceiveNotificationResponse | null>(
      `/receiveNotification/${credentials.apiTokenInstance}`,
      { params: { receiveTimeout }, signal },
    );

    if (!data || typeof data !== 'object' || !('receiptId' in data))
      return null;

    return data;
  } catch (error) {
    if (axios.isCancel(error) || (error instanceof Error && error.name === 'CanceledError'))
      throw error;

    throw toGreenApiError(error);
  }
}
