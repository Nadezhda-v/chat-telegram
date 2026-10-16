import { createGreenApiClient } from '@/shared/api/client';
import { toGreenApiError } from '@/shared/api/errors';
import type { Credentials, GetStateInstanceResponse } from '@/shared/api/types';

/**
 * Проверяет корректность пары idInstance / apiTokenInstance.
 * Метод: GET /getStateInstance/{apiTokenInstance}
 */
export async function getStateInstance(
  credentials: Credentials,
  signal?: AbortSignal,
): Promise<GetStateInstanceResponse> {
  const client = createGreenApiClient(credentials);

  try {
    const { data } = await client.get<GetStateInstanceResponse>(
      `/getStateInstance/${credentials.apiTokenInstance}`,
      { signal },
    );

    return data;
  } catch (error) {
    throw toGreenApiError(error);
  }
}
