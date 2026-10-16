import { Chat } from "../../model/types";

export interface ChatListItemProps {
  chat: Chat;
  active: boolean;
  onSelect: (chatId: string) => void;
}
