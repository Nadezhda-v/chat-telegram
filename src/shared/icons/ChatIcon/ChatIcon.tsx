import type { SVGProps } from 'react';

export const ChatIcon = ({ color = 'currentColor', ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox='0 0 24 24' width='48' height='48' aria-hidden='true' {...props}>
      <path
        fill={color}
        d='M12 2a10 10 0 0 0-8.66 15.02l-1.2 4.01a1 1 0 0 0 1.24 1.24l4.01-1.2A10 10 0 1 0 12 2z'
      />
    </svg>
  )
}
