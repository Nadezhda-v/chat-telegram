import { useCallback, useState } from 'react';
import { extractApiError } from '@/shared/api/errors';
import { useSessionStore } from '@/entities/session/model/store';
import { useChatStore } from '@/entities/chat/model/store';
import { createLocalId } from '@/shared/lib/utils';
import { showToast } from '@/shared/lib/toast';
import { sendMessage as sendMessageRequest } from '@/features/sendMessage/api/sendMessage';

/**
 * Отправка текстового сообщения с оптимистичным отображением в чате.
 */
export const useSendMessage = () => {
  const credentials = useSessionStore((state) => state.credentials);
  const addMessage = useChatStore((state) => state.addMessage);
  const confirmOutgoing = useChatStore((state) => state.confirmOutgoing);
  const updateMessageStatus = useChatStore((state) => state.updateMessageStatus);

  const [isSending, setIsSending] = useState(false);

  const sendMessage = useCallback(
    async (chatId: string, text: string): Promise<boolean> => {
      const trimmed = text.trim();
      if (!trimmed || !credentials) {
        return false;
      }

      const localId = createLocalId();

      addMessage({
        id: localId,
        chatId,
        text: trimmed,
        outgoing: true,
        timestamp: Date.now(),
        status: 'pending',
      });

      setIsSending(true);

      try {
        const { idMessage } = await sendMessageRequest(credentials, chatId, trimmed);
        confirmOutgoing(chatId, localId, idMessage);
        return true;
      } catch (error) {
        updateMessageStatus(chatId, localId, 'failed');
        showToast(extractApiError(error));
        return false;
      } finally {
        setIsSending(false);
      }
    },
    [credentials, addMessage, confirmOutgoing, updateMessageStatus],
  );

  return { sendMessage, isSending };
}
