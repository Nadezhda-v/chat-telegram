export type MessageStatus = 'pending' | 'sent' | 'failed';

export interface Message {
  id: string;
  chatId: string;
  text: string;
  outgoing: boolean;
  timestamp: number;
  status: MessageStatus;
}
