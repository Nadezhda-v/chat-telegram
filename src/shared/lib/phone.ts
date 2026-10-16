import { CHAT_ID_SUFFIX, PHONE_PATTERN } from '@/shared/config/constants';

/** Удаляет всё, кроме цифр: `+7 (900) 123-45-67` -> `79001234567`. */
export const normalizePhone = (input: string): string => {
  return input.replace(/\D/g, '');
}

/**
 * Проверяет номер в международном формате:
 * 10-15 цифр, начинается с кода страны (не с нуля).
 */
export const isValidPhone = (input: string): boolean => {
  return PHONE_PATTERN.test(normalizePhone(input));
}

/** Преобразует номер телефона в идентификатор чата GREEN API. */
export const toChatId = (phone: string): string => {
  return `${normalizePhone(phone)}${CHAT_ID_SUFFIX}`;
}

/** Извлекает номер телефона из идентификатора чата вида `79001234567@c.us`. */
export const chatIdToPhone = (chatId: string): string | null => {
  if (!chatId.endsWith(CHAT_ID_SUFFIX)) return null;

  const digits = chatId.slice(0, -CHAT_ID_SUFFIX.length).replace(/\D/g, '');

  return digits || null;
}

/** Представление номера для UI: `79001234567` -> `+7 900 123-45-67`. */
export const formatPhone = (phone: string): string => {
  const digits = normalizePhone(phone);
  if (!digits) return '';

  return `+${digits}`;
}

/** Формирует название чата по номеру, если имя неизвестно. */
export const phoneToChatName = (phone: string): string => formatPhone(phone);
