export const WIN_AT = 2048;

export const GRID_DEFAULT_SIZE = 4;
export const GRID_MIN_SIZE = 1;
export const GRID_MAX_SIZE = 6;

export const TILE_MAX_SIZE = 120;

export const OBSTACLES_DEFAULT_COUNT = 2;
export const OBSTACLES_MAX_COUNT = 4;
export const OBSTACLE_VALUE = -1;

export const ARROW_KEYS = [
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
] as const;
export type Direction = typeof ARROW_KEYS[number];

