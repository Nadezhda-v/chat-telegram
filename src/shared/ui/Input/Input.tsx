import { forwardRef } from 'react';
import { cn } from '@/shared/lib/utils';
import { InputProps } from './Input.types';
import './Input.scss';

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, invalid = false, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn('input', invalid && 'input--invalid', className)}
      {...rest}
    />
  );
});
