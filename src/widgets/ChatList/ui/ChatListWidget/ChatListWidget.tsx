import { useChatStore } from '@/entities/chat/model/store';
import { ChatListItem } from '@/entities/chat/ui/ChatListItem/ChatListItem';
import { CreateChatForm } from '@/features/createChat/ui/CreateChatForm';
import { cn } from '@/shared/lib/utils';
import { ChatListWidgetProps } from './ChatListWidget.types';
import { STATUS_LABEL } from './ChatListWidget.constants';
import './ChatListWidget.scss';

export const ChatListWidget = ({
  activeChatId,
  pollingStatus,
  onSelect,
  onLogout,
}: ChatListWidgetProps) => {
  const chats = useChatStore((state) => state.chats);
  const order = useChatStore((state) => state.order);

  const orderedChats = order.map((id) => chats[id]).filter((chat) => chat !== undefined);

  return (
    <aside className='chat-list'>
      <header className='chat-list__header'>
        <div className='chat-list__brand'>
          <span className='chat-list__title'>Telegram</span>
          <span className={cn('chat-list__status', `chat-list__status--${pollingStatus}`)}>
            <span className='chat-list__status-dot' />
            {STATUS_LABEL[pollingStatus]}
          </span>
        </div>
        <button type='button' className='chat-list__logout' onClick={onLogout}>
          Выйти
        </button>
      </header>

      <CreateChatForm onCreated={onSelect} />

      <div className='chat-list__items'>
        {orderedChats.length === 0 ? (
          <div className='chat-list__empty'>
            <p className='chat-list__empty-title'>Пока чатов нет</p>
            <p className='chat-list__empty-text'>
              Введите номер телефона получателя, чтобы начать переписку.
            </p>
          </div>
        ) : (
          orderedChats.map((chat) => (
            <ChatListItem
              key={chat.id}
              chat={chat}
              active={chat.id === activeChatId}
              onSelect={onSelect}
            />
          ))
        )}
      </div>
    </aside>
  );
}
