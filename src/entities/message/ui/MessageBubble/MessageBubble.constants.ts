import type { ComponentType, SVGProps } from 'react';
import type { Message } from '../../model/types';
import { AlertIcon, CheckIcon, ClockIcon } from '@/shared/icons';

export const STATUS_ICON: Record<
  Message['status'],
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  pending: ClockIcon,
  sent: CheckIcon,
  failed: AlertIcon,
}
