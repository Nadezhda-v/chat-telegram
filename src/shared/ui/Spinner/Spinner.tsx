import { cn } from '@/shared/lib/utils';
import { SpinnerProps } from './Spinner.types';
import './Spinner.scss';

export const Spinner = ({ size = 16, className }: SpinnerProps) => {
  return (
    <span
      className={cn('spinner', className)}
      style={{ width: size, height: size }}
      role='status'
      aria-label='Загрузка'
    />
  );
}
