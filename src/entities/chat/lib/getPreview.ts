import { Chat } from '../model/types';

export const getPreview = (chat: Chat): string => {
  const lastMessage = chat.messages[chat.messages.length - 1];
  if (!lastMessage) return 'Нет сообщений';

  const prefix = lastMessage.outgoing ? 'Вы: ' : '';

  return `${prefix}${lastMessage.text}`;
};
