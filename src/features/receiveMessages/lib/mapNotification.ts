import type { NotificationBody } from '@/shared/api/types';
import { formatPhone } from '@/shared/lib/phone';

export interface IncomingTextMessage {
  senderChatId: string;
  phone: string | null;
  isGroup: boolean;
  name: string;
  idMessage: string;
  text: string;
  timestamp: number;
}

/**
 * Преобразует уведомление GREEN API в модель входящего текстового сообщения.
 * Возвращает `null` для всех не-текстовых и служебных уведомлений.
 */
export function mapTextNotification(body: NotificationBody): IncomingTextMessage | null {
  if (body.typeWebhook !== 'incomingMessageReceived') return null;

  const messageData = body.messageData;
  if (!messageData) return null;

  const isTextMessage = messageData.typeMessage === 'textMessage';
  const isExtendedText = messageData.typeMessage === 'extendedTextMessage';

  if (!isTextMessage && !isExtendedText) return null;

  const text = isTextMessage
    ? messageData.textMessageData?.textMessage
    : messageData.extendedTextMessageData?.text;
  const senderData = body.senderData;

  if (!text || !senderData) return null;

  const isGroup = senderData.chatType
    ? senderData.chatType !== 'user'
    : senderData.chatId.startsWith('-');

  const phone =
    !isGroup && senderData.senderPhoneNumber && senderData.senderPhoneNumber > 0
      ? String(senderData.senderPhoneNumber)
      : null;

  const name =
    senderData.senderName ||
    senderData.chatName ||
    (phone ? formatPhone(phone) : senderData.chatId);

  return {
    senderChatId: senderData.chatId,
    phone,
    isGroup,
    name,
    idMessage: body.idMessage,
    text,
    timestamp: body.timestamp * 1000,
  };
}
