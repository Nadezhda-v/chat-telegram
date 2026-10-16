import { useEffect, useRef, useState, type RefObject } from 'react';

const MAX_TEXTAREA_HEIGHT = 140;

export interface UseMessageInputResult {
  text: string;
  setText: (value: string) => void;
  textareaRef: RefObject<HTMLTextAreaElement>;
}

export const useMessageInput = (chatId: string): UseMessageInputResult => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setText('');
  }, [chatId]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, MAX_TEXTAREA_HEIGHT)}px`;
  }, [text]);

  return { text, setText, textareaRef };
};
