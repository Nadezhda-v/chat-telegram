import type { Message } from '@/entities/message/model/types';

const timeFormatter = new Intl.DateTimeFormat('ru-RU', {
  hour: '2-digit',
  minute: '2-digit',
});

const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

/** Форматирует метку времени сообщения в `HH:mm`. */
export const formatMessageTime = (timestampMs: number): string => {
  return timeFormatter.format(new Date(timestampMs));
}

/** Форматирует дату-разделитель. */
export const formatDateLabel = (timestampMs: number): string => {
  const date = new Date(timestampMs);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (isSameDay(date, today)) return 'Сегодня';

  if (isSameDay(date, yesterday)) return 'Вчера';

  return dateFormatter.format(date);
}

/** Возвращает день (без времени) для группировки сообщений по датам. */
export const startOfDay = (timestampMs: number): number => {
  const date = new Date(timestampMs);
  date.setHours(0, 0, 0, 0);

  return date.getTime();
}

export const isSameDay = (a: Date, b: Date): boolean => {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export interface MessageGroup {
  dayKey: number;
  label: string;
  messages: Message[];
}

/** Группирует сообщения по дням для отрисовки разделителей дат. */
export const groupMessagesByDay = (messages: Message[]): MessageGroup[] => {
  const groups: MessageGroup[] = [];

  for (const message of messages) {
    const dayKey = startOfDay(message.timestamp);
    const lastGroup = groups[groups.length - 1];

    if (lastGroup && lastGroup.dayKey === dayKey) lastGroup.messages.push(message);
    else {
      groups.push({
        dayKey,
        label: formatDateLabel(message.timestamp),
        messages: [message],
      });
    }
  }

  return groups;
}
