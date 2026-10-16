type ClassValue = string | number | false | null | undefined;

/** Helper для условной склейки CSS-классов. */
export const cn = (...values: ClassValue[]): string => {
  return values.filter(Boolean).join(' ');
}

/** Генерирует уникальный идентификатор для локальных (оптимистичных) сообщений. */
export const createLocalId = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function')
    return `local-${crypto.randomUUID()}`;

  return `local-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/** Возвращает Promise, который резолвится через указанное число миллисекунд. */
export const delay = (ms: number, signal?: AbortSignal): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Aborted', 'AbortError'));
      return;
    }

    const timeoutId = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort);
      resolve();
    }, ms);

    function onAbort(): void {
      clearTimeout(timeoutId);
      reject(new DOMException('Aborted', 'AbortError'));
    }

    signal?.addEventListener('abort', onAbort, { once: true });
  });
}
