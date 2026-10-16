import { Chat } from '@/entities/chat/model/types';
import { useEffect, useRef } from 'react';

export const useScrollToBottom = (chat: Chat | null) => {
  const messagesRef = useRef<HTMLDivElement>(null);
  const messageCount = chat?.messages.length ?? 0;

  useEffect(() => {
    const container = messagesRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messageCount, chat?.id]);

  return messagesRef;
}
