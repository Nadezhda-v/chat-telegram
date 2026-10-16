import { Message } from '../../model/types';

export const STATUS_LABEL: Record<Message['status'], string> = {
  pending: '🕓',
  sent: '✓',
  failed: '⚠',
};
