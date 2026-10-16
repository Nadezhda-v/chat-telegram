import axios from 'axios';

export class GreenApiError extends Error {
  public readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'GreenApiError';
    this.status = status;
  };
};

/**
 * Нормализует ошибку axios / GREEN API в человекочитаемое сообщение
 */

export function extractApiError(error: unknown): string {
  if (error instanceof GreenApiError) {
    return error.message;
  }

  if (axios.isAxiosError(error)) {
    if (error.code === 'ERR_CANCELED') {
      return 'Запрос отменён';
    }

    if (!error.response) {
      return 'Нет соединения с сервером. Проверьте интернет и повторите попытку.';
    }

    const { status, data } = error.response;

    if (status === 401)
      return 'Неверный idInstance или apiTokenInstance.';
    
    if (status === 403)
      return 'Доступ запрещён. Проверьте тариф и настройки инстанса.';
    
    if (status === 429)
      return 'Слишком много запросов. Попробуйте позже.';

    const payloadMessage = extractMessageFromPayload(data);
  
    if (payloadMessage) return payloadMessage;
    
    return `Ошибка запроса (${status}).`;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Неизвестная ошибка.';
};

/** Оборачивает произвольную ошибку в GreenApiError с готовым сообщением. */
export function toGreenApiError(error: unknown): GreenApiError {
  return new GreenApiError(extractApiError(error));
};

function extractMessageFromPayload(data: unknown): string | null {
  if (!data) return null;

  if (typeof data === 'string')
    return data.trim() || null;

  if (typeof data === 'object') {
    const record = data as Record<string, unknown>;
    const candidate = record.message ?? record.description ?? record.error;

    if (typeof candidate === 'string' && candidate.trim())
      return candidate;
  }

  return null;
};
