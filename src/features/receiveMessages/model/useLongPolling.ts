import { useEffect, useRef, useState } from 'react';
import { useSessionStore } from '@/entities/session/model/store';
import { findChatByPhone, useChatStore } from '@/entities/chat/model/store';
import { RECEIVE_TIMEOUT_SECONDS, POLL_RETRY_DELAY_MS } from '@/shared/config/constants';
import { toChatId } from '@/shared/lib/phone';
import { delay } from '@/shared/lib/utils';
import { showToast } from '@/shared/lib/toast';
import { mapTextNotification } from '@/features/receiveMessages/lib/mapNotification';
import { receiveNotification } from '@/features/receiveMessages/api/receiveNotification';
import { deleteNotification } from '@/features/receiveMessages/api/deleteNotification';
import { PollingStatus } from './receiveMessages.types';

/** Обрабатывает одно уведомление, обновляя стор чатов. */
function handleNotification(body: Parameters<typeof mapTextNotification>[0]): void {
  const incoming = mapTextNotification(body);
  if (!incoming) return;

  const store = useChatStore.getState();

  // Сопоставляем входящее сообщение с уже созданным чатом по номеру телефона,
  // т.к. GREEN API может вернуть числовой идентификатор вместо `...@c.us`.
  let chatId = incoming.senderChatId;

  if (!incoming.isGroup && incoming.phone) {
    const existing = findChatByPhone(store.chats, incoming.phone);
    chatId = existing ? existing.id : toChatId(incoming.phone);
  }

  store.createChat({
    id: chatId,
    name: incoming.name,
    phone: incoming.phone,
    isGroup: incoming.isGroup,
  });

  store.addMessage({
    id: incoming.idMessage,
    chatId,
    text: incoming.text,
    outgoing: false,
    timestamp: incoming.timestamp,
    status: 'sent',
  });
}

/**
 * Long polling входящих уведомлений через ReceiveNotification + DeleteNotification.
 */
export const useLongPolling = (enabled = true): { status: PollingStatus } => {
  const credentials = useSessionStore((state) => state.credentials);
  const [status, setStatus] = useState<PollingStatus>('idle');
  const errorToastShown = useRef(false);

  useEffect(() => {
    if (!enabled || !credentials) {
      setStatus('idle');
      return undefined;
    }

    const controller = new AbortController();
    let stopped = false;

    setStatus('active');
    errorToastShown.current = false;

    const run = async (): Promise<void> => {
      while (!stopped) {
        try {
          const notification = await receiveNotification(
            credentials,
            controller.signal,
            RECEIVE_TIMEOUT_SECONDS,
          );

          if (stopped) break;

          setStatus('active');
          errorToastShown.current = false;

          if (!notification) continue;

          handleNotification(notification.body);
          await deleteNotification(credentials, notification.receiptId, controller.signal);
        } catch (error) {
          if (stopped || controller.signal.aborted) break;

          setStatus('error');

          if (!errorToastShown.current) {
            errorToastShown.current = true;
            showToast('Не удалось получить сообщения. Повторяем попытку…');
          }

          try {
            await delay(POLL_RETRY_DELAY_MS, controller.signal);
          } catch {
            break;
          }
        }
      }
    };

    void run();

    return () => {
      stopped = true;
      controller.abort();
    };
  }, [enabled, credentials]);

  return { status };
}
