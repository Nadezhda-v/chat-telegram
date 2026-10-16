import { MessageBubble } from '@/entities/message/ui/MessageBubble';
import { BackIcon } from '@/shared/icons';
import { Avatar } from '@/shared/ui';
import { groupMessagesByDay } from '@/shared/lib/time';
import { formatPhone } from '@/shared/lib/phone';
import { MessageInput } from '@/widgets/MessageInput/ui';
import { ChatWindowProps } from './ChatWindow.types';
import { ChatWindowEmpty } from '../ChatWindowEmpty/ChatWindowEmpty';
import { useScrollToBottom } from '../../lib/useScrollToBottom';
import './ChatWindow.scss';

export const ChatWindow = ({ chat, onBack }: ChatWindowProps) => {
  const messagesRef = useScrollToBottom(chat);

  if (!chat) return <ChatWindowEmpty />;
  
  const groups = groupMessagesByDay(chat.messages);
  const subtitle = chat.isGroup ? 'Групповой чат' : chat.phone ? formatPhone(chat.phone) : '';

  return (
    <section className='chat-window'>
      <header className='chat-window__header'>
        <button
          type='button'
          className='chat-window__back'
          onClick={onBack}
          aria-label='Назад к списку чатов'
        >
          <BackIcon />
        </button>

        <Avatar name={chat.name} size={42} colorSeed={chat.id} />

        <div className='chat-window__info'>
          <span className='chat-window__name'>{chat.name}</span>
          {subtitle && <span className='chat-window__subtitle'>{subtitle}</span>}
        </div>
      </header>

      <div className='chat-window__messages' ref={messagesRef}>
        {chat.messages.length === 0 ? (
          <div className='chat-window__no-messages'>
            <p>Сообщений пока нет.</p>
            <p>Напишите первым!</p>
          </div>
        ) : (
          groups.map((group) => (
            <div className='chat-window__group' key={group.dayKey}>
              <div className='chat-window__divider'>
                <span>{group.label}</span>
              </div>
              {group.messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
            </div>
          ))
        )}
      </div>

      <MessageInput chatId={chat.id} />
    </section>
  );
}
