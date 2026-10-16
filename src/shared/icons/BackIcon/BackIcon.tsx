import type { SVGProps } from 'react';

export const BackIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox='0 0 24 24' width='24' height='24' aria-hidden='true' {...props}>
      <path
        fill='currentColor'
        d='M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z'
      />
    </svg>
  )
}
