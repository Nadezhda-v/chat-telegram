import type { SVGProps } from 'react';

export const CheckIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox='0 0 24 24' width='16' height='16' aria-hidden='true' {...props}>
      <path
        fill='currentColor'
        d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'
      />
    </svg>
  )
}
