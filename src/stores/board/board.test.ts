import { createTile } from '@/test/fixtures';
import { createPinia, setActivePinia } from 'pinia';
import { describe, expect, it, vi } from 'vitest';
import { useBoardStore } from '.';
import { useConfigStore } from '../config';

describe('board store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());

    const config = useConfigStore();
    config.columnsCount = 4;
    config.rowsCount = 2;
    config.obstaclesCount = 2;
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('inits the board with obstacles and single tile', () => {
    const board = useBoardStore();

    expect(board.tiles).toHaveLength(0);

    board.init();

    expect(board.tiles).toHaveLength(3);
    expect(board.tiles.filter(board.isObstacle)).toHaveLength(2);
    expect(board.tiles.find((tile) => !board.isObstacle(tile))).toContain({ value: 2 });
  });

  it('handles movement, merges tiles and adds random', async () => {
    const board = useBoardStore();
    board.tiles.push(createTile(0, 0, 4));
    board.tiles.push(createTile(1, 0, 4));
    board.tiles.push(createTile(2, 0, -1));
    board.tiles.push(createTile(3, 0, 4));

    const promise = board.handleMove('ArrowLeft');
    simulateMovementFinishedEvent();
    await promise;

    expect(board.tiles).toHaveLength(4);
    expect(board.tiles).toContainEqual(expect.objectContaining({ x: 0, y: 0, value: 8 }));
    expect(board.tiles).toContainEqual(expect.objectContaining({ x: 3, y: 0, value: 4 }));
    expect(board.tiles).toContainEqual(expect.objectContaining({ value: 2 }));
  });

  it('handles game over', async () => {
    const spy = vi.spyOn(window, 'alert');
    const config = useConfigStore();
    config.columnsCount = 2;
    config.rowsCount = 2;

    const board = useBoardStore();
    board.tiles.push(createTile(0, 0, 4));
    board.tiles.push(createTile(1, 0, 8));
    board.tiles.push(createTile(0, 1, 16));
    board.tiles.push(createTile(1, 1, 32));

    await board.handleMove('ArrowDown');

    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenLastCalledWith('Game over :(');
  });

  it('handles game won', async () => {
    const spy = vi.spyOn(window, 'alert');

    const board = useBoardStore();
    board.tiles.push(createTile(0, 0, 1024));
    board.tiles.push(createTile(1, 0, 1024));

    const promise = board.handleMove('ArrowLeft');
    simulateMovementFinishedEvent();
    await promise;

    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenLastCalledWith('You won! Congrats!');
  });
});

function simulateMovementFinishedEvent() {
  document.dispatchEvent(new Event('movementFinished'));
}
