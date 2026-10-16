import type { Message } from '@/entities/message/model/types';

export interface Chat {
  id: string;
  name: string;
  phone: string | null;
  isGroup: boolean;
  messages: Message[];
  unread: number;
  lastActivity: number;
}

export interface CreateChatInput {
  id: string;
  name: string;
  phone: string | null;
  isGroup?: boolean;
}
