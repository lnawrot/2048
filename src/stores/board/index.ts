import { OBSTACLE_VALUE, WIN_AT, type Direction } from '@/config';
import { randomString, delay, waitForEvent } from '@/utils';
import { sample, times } from 'lodash-es';
import { defineStore } from 'pinia';
import { computed, ref, type Ref } from 'vue';
import { useConfigStore } from '../config';
import { calculateChanges, hasWon, isObstacle, type Changes } from './movement';
import { calculatePossiblePositions, getAvailablePositions, parsePositionKey } from './positions';
import type { Tile } from './types';

export {
  Tile,
};

export const useBoardStore = defineStore('board', () => {
  let isInTransition = false;
  const tiles = ref<Tile[]>([]);

  const possiblePositions = computed(() => {
    const config = useConfigStore();
    return calculatePossiblePositions(config.rowsCount, config.columnsCount);
  });

  function init() {
    tiles.value = [];
    isInTransition = false;
    addRandom(2);
    const { obstaclesCount } = useConfigStore();
    times(obstaclesCount, () => addRandom(OBSTACLE_VALUE));
  }

  function addRandom(value = 1): boolean {
    const availablePositions = getAvailablePositions(possiblePositions.value, tiles.value);
    if (!availablePositions) return false;

    const { x, y } = parsePositionKey(sample(availablePositions)!);
    tiles.value.push({
      id: randomString(),
      x,
      y,
      value,
    });

    return true;
  }

  async function handleMove(direction: Direction) {
    if (isInTransition) return;

    isInTransition = true;

    const { maxIndexes } = useConfigStore();
    const { toChange, toRemove } = calculateChanges(tiles.value, direction, maxIndexes);
    const hasAnythingChanged = applyChanges(tiles, toChange);
    if (hasAnythingChanged) {
      await waitForEvent('movementFinished');
    }
    applyRemoves(tiles, toRemove);

    await delay(150);
    const hasAdded = addRandom();
    if (!hasAdded) {
      window.alert('Game over :(');
      return;
    }
    if (hasWon(toChange, WIN_AT)) {
      window.alert('You won! Congrats!');
      return;
    }

    isInTransition = false;
  }

  return {
    tiles,

    init,
    addRandom,
    handleMove,

    isObstacle,
  };
});

function applyChanges(
  tiles: Ref<Tile[]>,
  toChange: Changes['toChange'],
) {
  if (!Object.keys(toChange).length) return false;

  tiles.value.forEach((tile) => {
    if (!Object.hasOwn(toChange, tile.id)) return;

    const change = toChange[tile.id];
    tile.value = change.value ?? tile.value;
    tile.x = change.x ?? tile.x;
    tile.y = change.y ?? tile.y;
  });

  return true;
}

function applyRemoves(
  tiles: Ref<Tile[]>,
  toRemove: Changes['toRemove'],
) {
  if (!toRemove.length) return;

  tiles.value = tiles.value.filter(({ id }) => !toRemove.includes(id));
}
