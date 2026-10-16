import { memo } from 'react';
import { Avatar } from '@/shared/ui';
import { cn } from '@/shared/lib/utils';
import { formatMessageTime } from '@/shared/lib/time';
import { ChatListItemProps } from './ChatListItem.types';
import { getPreview } from '../../lib/getPreview';
import './ChatListItem.scss';

export const ChatListItem = memo(function ChatListItem({
  chat,
  active,
  onSelect,
}: ChatListItemProps) {
  const lastMessage = chat.messages[chat.messages.length - 1];

  return (
    <button
      type='button'
      className={cn('chat-list-item', active && 'chat-list-item--active')}
      onClick={() => onSelect(chat.id)}
      aria-current={active}
    >
      <Avatar name={chat.name} size={54} colorSeed={chat.id} />

      <div className='chat-list-item__body'>
        <div className='chat-list-item__row'>
          <span className='chat-list-item__name'>{chat.name}</span>
          {lastMessage && (
            <span className='chat-list-item__time'>
              {formatMessageTime(lastMessage.timestamp)}
            </span>
          )}
        </div>

        <div className='chat-list-item__row'>
          <span className='chat-list-item__preview'>{getPreview(chat)}</span>
          {chat.unread > 0 && <span className='chat-list-item__badge'>{chat.unread}</span>}
        </div>
      </div>
    </button>
  );
});
