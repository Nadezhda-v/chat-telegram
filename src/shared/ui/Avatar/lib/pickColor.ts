import { PALETTE } from '../model/Avatar.constants';

export const pickColor = (seed: string): string => {
  let hash = 0;

  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }

  return PALETTE[hash % PALETTE.length] ?? PALETTE[0]!;
}
