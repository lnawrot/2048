import { ARROW_KEYS, type Direction } from '@/config';

export function isArrowKey(key: string): key is Direction {
  return ARROW_KEYS.includes(key as any);
}
