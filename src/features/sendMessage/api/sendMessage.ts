import { createGreenApiClient } from '@/shared/api/client';
import { toGreenApiError } from '@/shared/api/errors';
import type { Credentials, SendMessageResponse } from '@/shared/api/types';

/**
 * Отправляет текстовое сообщение в чат.
 * Метод: POST /sendMessage/{apiTokenInstance}
 */
export const sendMessage = async (
  credentials: Credentials,
  chatId: string,
  message: string,
  signal?: AbortSignal,
): Promise<SendMessageResponse> => {
  const client = createGreenApiClient(credentials);

  try {
    const { data } = await client.post<SendMessageResponse>(
      `/sendMessage/${credentials.apiTokenInstance}`,
      { chatId, message },
      { signal },
    );

    return data;
  } catch (error) {
    throw toGreenApiError(error);
  }
}
