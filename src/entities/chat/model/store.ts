import { create } from 'zustand';
import { chatIdToPhone } from '@/shared/lib/phone';
import type { Message, MessageStatus } from '@/entities/message/model/types';
import type { Chat, CreateChatInput } from './types';

interface ChatState {
  chats: Record<string, Chat>;
  order: string[];
  activeChatId: string | null;
  processed: Record<string, true>;

  createChat: (input: CreateChatInput) => string;
  setActiveChat: (chatId: string | null) => void;
  addMessage: (message: Message) => void;
  updateMessageStatus: (chatId: string, messageId: string, status: MessageStatus) => void;
  confirmOutgoing: (chatId: string, localId: string, serverId: string) => void;
  reset: () => void;
}

const initialState = {
  chats: {} as Record<string, Chat>,
  order: [] as string[],
  activeChatId: null as string | null,
  processed: {} as Record<string, true>,
};

export const useChatStore = create<ChatState>((set, get) => ({
  ...initialState,

  createChat: (input) => {
    const existing = get().chats[input.id];
    if (existing) {
      if (input.name && input.name !== existing.name) {
        set((state) => ({
          chats: { ...state.chats, [input.id]: { ...existing, name: input.name } },
        }));
      }

      return input.id;
    }

    const chat: Chat = {
      id: input.id,
      name: input.name,
      phone: input.phone,
      isGroup: input.isGroup ?? false,
      messages: [],
      unread: 0,
      lastActivity: Date.now(),
    };

    set((state) => ({
      chats: { ...state.chats, [chat.id]: chat },
      order: [chat.id, ...state.order],
    }));

    return chat.id;
  },

  setActiveChat: (chatId) => {
    set((state) => {
      if (!chatId) return { activeChatId: null };

      const chat = state.chats[chatId];
      if (!chat) return { activeChatId: chatId };

      return {
        activeChatId: chatId,
        chats: { ...state.chats, [chatId]: { ...chat, unread: 0 } },
      };
    });
  },

  addMessage: (message) => {
    set((state) => {
      if (state.processed[message.id]) return state;

      const chat = state.chats[message.chatId];
      if (!chat) return state;

      const messages = [...chat.messages, message].sort((a, b) => a.timestamp - b.timestamp);
      const isActive = state.activeChatId === message.chatId;
      const shouldIncreaseUnread = !message.outgoing && !isActive;

      const updatedChat: Chat = {
        ...chat,
        messages,
        lastActivity: message.timestamp,
        unread: isActive
          ? 0
          : shouldIncreaseUnread
            ? chat.unread + 1
            : chat.unread,
      };

      return {
        chats: { ...state.chats, [message.chatId]: updatedChat },
        order: [message.chatId, ...state.order.filter((id) => id !== message.chatId)],
        processed: { ...state.processed, [message.id]: true },
      };
    });
  },

  updateMessageStatus: (chatId, messageId, status) => {
    set((state) => {
      const chat = state.chats[chatId];
      if (!chat) return state;

      return {
        chats: {
          ...state.chats,
          [chatId]: {
            ...chat,
            messages: chat.messages.map((message) =>
              message.id === messageId ? { ...message, status } : message,
            ),
          },
        },
      };
    });
  },

  confirmOutgoing: (chatId, localId, serverId) => {
    set((state) => {
      const chat = state.chats[chatId];
      if (!chat) return state;

      // Если серверное сообщение уже пришло через long polling — убираем локальную копию.
      const alreadyReceived = chat.messages.some((message) => message.id === serverId);
      const messages = alreadyReceived
        ? chat.messages.filter((message) => message.id !== localId)
        : chat.messages.map((message) =>
            message.id === localId ? { ...message, id: serverId, status: 'sent' as const } : message,
          );

      return {
        chats: {
          ...state.chats,
          [chatId]: { ...chat, messages },
        },
        processed: { ...state.processed, [serverId]: true },
      };
    });
  },

  reset: () => set({ ...initialState }),
}));

/** Находит чат по номеру телефона (для сопоставления входящих сообщений). */
export const findChatByPhone = (chats: Record<string, Chat>, phone: string): Chat | undefined => {
  return Object.values(chats).find(
    (chat) => chat.phone === phone || chatIdToPhone(chat.id) === phone,
  );
}
