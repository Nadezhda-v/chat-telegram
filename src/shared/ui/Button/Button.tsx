import { cn } from '@/shared/lib/utils';
import { ButtonProps } from './Button.types';
import './Button.scss';

export const Button = ({
  variant = 'primary',
  block = false,
  className,
  type = 'button',
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={cn('button', `button--${variant}`, block && 'button--block', className)}
      {...rest}
    >
      {children}
    </button>
  );
}
