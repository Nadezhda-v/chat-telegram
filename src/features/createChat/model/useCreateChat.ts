import { useState, type FormEvent } from 'react';
import { useChatStore } from '@/entities/chat/model/store';
import { toChatId, isValidPhone, normalizePhone, phoneToChatName } from '@/shared/lib/phone';
import { CreateChatModel } from '../ui/CreateChatForm.types';

export const useCreateChat = ({ onCreated }: CreateChatModel) => {
  const createChat = useChatStore((state) => state.createChat);
  const setActiveChat = useChatStore((state) => state.setActiveChat);

  const [phone, setPhone] = useState('');
  const [invalid, setInvalid] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!isValidPhone(phone)) {
      setInvalid(true);
      return;
    }

    setInvalid(false);

    const normalized = normalizePhone(phone);
    const chatId = toChatId(normalized);

    createChat({
      id: chatId,
      name: phoneToChatName(normalized),
      phone: normalized,
      isGroup: false,
    });
    setActiveChat(chatId);
    setPhone('');
    onCreated?.(chatId);
  };

  return {
    invalid,
    phone,
    setPhone,
    setInvalid,
    handleSubmit,
  }
}
