import { memo } from 'react';
import { cn } from '@/shared/lib/utils';
import { formatMessageTime } from '@/shared/lib/time';
import { MessageBubbleProps } from './MessageBubble.types';
import { STATUS_LABEL } from './MessageBubble.constants';
import './MessageBubble.scss';

export const MessageBubble = memo(function MessageBubble({
  message,
}: MessageBubbleProps) {
  return (
    <div
      className={cn(
        'message-bubble',
        message.outgoing ? 'message-bubble--outgoing' : 'message-bubble--incoming',
        message.status === 'failed' && 'message-bubble--failed',
      )}
    >
      <span className='message-bubble__text'>{message.text}</span>
      <span className='message-bubble__meta'>
        <span className='message-bubble__time'>
          {formatMessageTime(message.timestamp)}
        </span>

        {message.outgoing && (
          <span
            className={cn(
              'message-bubble__status',
              `message-bubble__status--${message.status}`,
            )}
            title={message.status === 'failed' ? 'Не отправлено' : undefined}
          >
            {STATUS_LABEL[message.status]}
          </span>
        )}
      </span>
    </div>
  );
});
