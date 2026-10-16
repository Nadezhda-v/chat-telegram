import { useEffect, useState } from 'react';
import { useMediaQuery } from '@/shared/lib/useMediaQuery';
import { useAuth } from '@/features/auth/model/useAuth';
import { useChatStore } from '@/entities/chat/model/store';
import { MobileScreen } from './ChatPage.types';

export const useChatPage = () => {
  const chats = useChatStore((state) => state.chats);
  const activeChatId = useChatStore((state) => state.activeChatId);
  const setActiveChat = useChatStore((state) => state.setActiveChat);
  const reset = useChatStore((state) => state.reset);
  const { logout } = useAuth();

  const isMobile = useMediaQuery('(max-width: 900px)');
  const [mobileScreen, setMobileScreen] = useState<MobileScreen>('list');

  const activeChat = activeChatId ? (chats[activeChatId] ?? null) : null;

  useEffect(() => {
    if (!isMobile) setMobileScreen(activeChatId ? 'chat' : 'list');
  }, [isMobile, activeChatId]);

  const handleSelect = (chatId: string): void => {
    setActiveChat(chatId);
    if (isMobile) setMobileScreen('chat');
  };

  const handleLogout = (): void => {
    reset();
    logout();
  };

  const showList = !isMobile || mobileScreen === 'list';
  const showChat = !isMobile || mobileScreen === 'chat';

  return {
    isMobile,
    showList,
    showChat,
    activeChat,
    handleSelect,
    handleLogout,
    setMobileScreen,
  }
}
