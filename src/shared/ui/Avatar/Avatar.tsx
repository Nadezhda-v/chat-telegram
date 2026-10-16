import { cn } from '@/shared/lib/utils';
import { AvatarProps } from './model/Avatar.types';
import { getInitials, pickColor } from './lib';
import './Avatar.scss';

export const Avatar = ({
  name,
  colorSeed,
  size = 48,
  className,
}: AvatarProps) => {
  const background = pickColor(colorSeed ?? name);

  return (
    <div
      className={cn('avatar', className)}
      style={{ width: size, height: size, backgroundColor: background, fontSize: Math.floor(size * 0.4) }}
      aria-hidden='true'
    >
      {getInitials(name)}
    </div>
  );
}
