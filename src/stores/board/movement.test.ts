import { createTile } from '@/test/fixtures';
import { describe, expect, it } from 'vitest';
import { calculateChanges, isObstacle } from './movement';

describe('board movements', () => {
  it('checks whether tile is an obstacle', () => {
    expect(isObstacle(createTile(0, 0, -1))).toEqual(true);
    expect(isObstacle(createTile(0, 0, 2))).toEqual(false);
  });

  it('calculates group changes without obstacles (y-axis)', () => {
    const tiles = [
      createTile(0, 0, 2),
      createTile(0, 1, 2),
      createTile(0, 2, 2),
      createTile(0, 4, 8),
    ];

    const { toChange, toRemove } = calculateChanges(tiles, 'ArrowDown', { rows: 6, columns: 0 });
    expect(toRemove).toContain(tiles[1].id);
    expect(toChange[tiles[0].id]).toEqual({
      y: 4,
    });
    expect(toChange[tiles[2].id]).toEqual({
      y: 5,
      value: 4,
    });
    expect(toChange[tiles[3].id]).toEqual({
      y: 6,
    });
  });

  it('calculates reversed group changes without obstacles (x-axis)', () => {
    const tiles = [
      createTile(0, 0, 2),
      createTile(1, 0, 2),
      createTile(2, 0, 2),
      createTile(4, 0, 8),
    ];

    const { toChange, toRemove } = calculateChanges(tiles, 'ArrowLeft', { rows: 0, columns: 6 });
    expect(toRemove).toContain(tiles[1].id);
    expect(toChange[tiles[0].id]).toEqual({
      value: 4,
      x: 0,
    });
    expect(toChange[tiles[2].id]).toEqual({
      x: 1,
    });
    expect(toChange[tiles[3].id]).toEqual({
      x: 2,
    });
  });

  it('calculates group changes with obstacles (x-axis)', () => {
    const tiles = [
      createTile(0, 0, 2),
      createTile(1, 0, 2),
      createTile(2, 0, 2),
      createTile(3, 0, -1),
      createTile(4, 0, 8),
    ];

    const { toChange, toRemove } = calculateChanges(tiles, 'ArrowRight', { rows: 0, columns: 6 });
    expect(toRemove).toContain(tiles[1].id);
    expect(toChange[tiles[0].id]).toEqual({
      x: 1,
    });
    expect(toChange[tiles[2].id]).toEqual({
      x: 2,
      value: 4,
    });
    expect(toChange[tiles[4].id]).toEqual({
      x: 6,
    });
  });

  it('calculates reversed group changes with obstacles (x-axis)', () => {
    const tiles = [
      createTile(0, 0, 2),
      createTile(1, 0, -1),
      createTile(2, 0, 2),
      createTile(4, 0, 2),
      createTile(5, 0, 8),
    ];

    const { toChange, toRemove } = calculateChanges(tiles, 'ArrowLeft', { rows: 0, columns: 6 });
    expect(Object.keys(toChange)).not.toContain(tiles[0].id);
    expect(Object.keys(toChange)).not.toContain(tiles[1].id);
    expect(toChange[tiles[2].id]).toEqual({
      value: 4,
      x: 2,
    });
    expect(toRemove).toContain(tiles[3].id);
    expect(toChange[tiles[4].id]).toEqual({
      x: 3,
    });
  });
});

