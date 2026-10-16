import { PollingStatus } from '@/features/receiveMessages/model/receiveMessages.types';

export const STATUS_LABEL: Record<PollingStatus, string> = {
  idle: 'Не подключено',
  active: 'На связи',
  error: 'Переподключение…',
};
