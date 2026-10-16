import { PollingStatus } from '@/features/receiveMessages/model/receiveMessages.types';

export interface ChatListWidgetProps {
  activeChatId: string | null;
  pollingStatus: PollingStatus;
  onSelect: (chatId: string) => void;
  onLogout: () => void;
}
