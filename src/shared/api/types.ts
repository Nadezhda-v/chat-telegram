export interface Credentials {
  idInstance: string;
  apiTokenInstance: string;
}

/** POST /sendMessage/{token} */
export interface SendMessageRequest {
  chatId: string;
  message: string;
}

export interface SendMessageResponse {
  idMessage: string;
}

/** GET /receiveNotification/{token} */
export interface ReceiveNotificationResponse {
  receiptId: number;
  body: NotificationBody;
}

/** DELETE /deleteNotification/{token}/{receiptId} */
export interface DeleteNotificationResponse {
  result: boolean;
  reason: string;
}

/** GET /getStateInstance/{token} */
export interface GetStateInstanceResponse {
  stateInstance: string;
}

export type WebhookType =
  | 'incomingMessageReceived'
  | 'outgoingMessageReceived'
  | 'outgoingAPIMessageReceived'
  | 'outgoingMessageStatus'
  | 'stateInstanceChanged'
  | 'quotaExceeded'
  | string;

export interface InstanceData {
  idInstance: number;
  wid: string;
  typeInstance: string;
}

export interface SenderData {
  chatId: string;
  chatType?: string;
  sender: string;
  senderName?: string;
  chatName?: string;
  senderContactName?: string;
  senderPhoneNumber?: number;
}

export interface TextMessageData {
  textMessage: string;
  isForwarded?: boolean;
  forwardingScore?: number;
}

export interface MessageData {
  typeMessage: string;
  textMessageData?: TextMessageData;
  extendedTextMessageData?: { text: string };
}

export interface NotificationBody {
  typeWebhook: WebhookType;
  instanceData: InstanceData;
  timestamp: number;
  idMessage: string;
  senderData: SenderData;
  messageData?: MessageData;
}
