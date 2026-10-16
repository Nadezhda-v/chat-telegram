import { type ChangeEvent, type KeyboardEvent } from 'react';
import { useSendMessage } from '@/features/sendMessage/model/useSendMessage';
import { SendIcon } from '@/shared/icons';
import { cn } from '@/shared/lib/utils';
import { useMessageInput } from '../../lib/useMessageInput';
import { MessageInputProps } from './MessageInput.types';
import './MessageInput.scss';

export const MessageInput = ({
  chatId,
  disabled = false,
}: MessageInputProps) => {
  const { sendMessage, isSending } = useSendMessage();
  const { text, setText, textareaRef } = useMessageInput(chatId);

  const handleSubmit = async (): Promise<void> => {
    const value = text.trim();
    if (!value || isSending || disabled) return;

    setText('');
    const success = await sendMessage(chatId, value);

    if (!success) setText(value);
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setText(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void handleSubmit();
    }
  };

  const canSend = text.trim().length > 0 && !isSending && !disabled;

  return (
    <div className='message-input'>
      <textarea
        ref={textareaRef}
        className='message-input__field'
        placeholder='Напишите сообщение…'
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        rows={1}
        disabled={disabled}
      />
      <button
        type='button'
        className={cn('message-input__send', canSend && 'message-input__send--enabled')}
        onClick={handleSubmit}
        disabled={!canSend}
        aria-label='Отправить сообщение'
      >
        <SendIcon />
      </button>
    </div>
  );
}
