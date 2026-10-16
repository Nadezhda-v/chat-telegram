import { Chat } from '@/entities/chat/model/types';

export interface ChatWindowProps {
  chat: Chat | null;
  onBack: () => void;
}
