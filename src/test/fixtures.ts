import type { Tile } from '@/stores/board';
import { randomString } from '@/utils';

export function createTile(x: number, y: number, value: number): Tile {
  return {
    id: randomString(),
    x,
    y,
    value,
  };
}
