import { createGreenApiClient } from '@/shared/api/client';
import { toGreenApiError } from '@/shared/api/errors';
import type { Credentials, DeleteNotificationResponse } from '@/shared/api/types';

/**
 * Подтверждает обработку и удаляет уведомление из очереди.
 * Метод: DELETE /deleteNotification/{apiTokenInstance}/{receiptId}
 */
export async function deleteNotification(
  credentials: Credentials,
  receiptId: number,
  signal?: AbortSignal,
): Promise<DeleteNotificationResponse> {
  const client = createGreenApiClient(credentials);

  try {
    const { data } = await client.delete<DeleteNotificationResponse>(
      `/deleteNotification/${credentials.apiTokenInstance}/${receiptId}`,
      { signal },
    );

    return data;
  } catch (error) {
    throw toGreenApiError(error);
  }
}
