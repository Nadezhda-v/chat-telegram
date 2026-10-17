
import { ChatListWidget } from '@/widgets/ChatList/ui';
import { ChatWindow } from '@/widgets/ChatWindow/ui';

import { cn } from '@/shared/lib/utils';
import { useChatPage } from '../model/useChatPage';
import { useLongPolling } from '@/features/receiveMessages/model/useLongPolling';
import { useChatStore } from '@/entities/chat/model/store';
import './ChatPage.scss';

export function ChatPage() {
  const activeChatId = useChatStore((state) => state.activeChatId);
  const { status } = useLongPolling(true);
  const {
    isMobile,
    showList,
    showChat,
    activeChat,
    handleSelect,
    handleLogout,
    setMobileScreen,
  } = useChatPage();

  return (
    <div className={cn('chat-page', isMobile && 'chat-page--mobile')}>
      {showList && (
        <ChatListWidget
          activeChatId={activeChatId}
          pollingStatus={status}
          onSelect={handleSelect}
          onLogout={handleLogout}
        />
      )}

      {showChat && <ChatWindow chat={activeChat} onBack={() => setMobileScreen('list')} />}
    </div>
  );
}

