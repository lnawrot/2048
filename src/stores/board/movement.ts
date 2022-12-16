import { OBSTACLE_VALUE, type Direction } from '@/config';
import { groupBy } from 'lodash-es';
import type { Tile } from '.';


type Size = {
  rows: number,
  columns: number,
};
type ChangeEntry = {
  value?: number,
  x?: number,
  y?: number,
};
export type Changes = {
  toChange: Record<Tile['id'], ChangeEntry>,
  toRemove: Array<Tile['id']>,
};

export function calculateChanges(tiles: Tile[], direction: Direction, maxIndexes: Size): Changes {
  const isHorizontal = direction === 'ArrowLeft' || direction === 'ArrowRight';
  const isReversed = direction === 'ArrowLeft' || direction === 'ArrowUp';

  let startPositionsFrom = 0;
  if (!isReversed) {
    startPositionsFrom = isHorizontal
      ? maxIndexes.columns
      : maxIndexes.rows;
  }
  const sortingMethod = getSortingMethod(isHorizontal, isReversed);

  const groupped = groupBy(tiles, ({ x, y }) => isHorizontal ? y : x);
  const changes = Object.values(groupped).reduce((all, group) => {
    // sort group so that it can always be handled from left to right
    group.sort(sortingMethod);

    const result = calculateGroupChanges(group, isHorizontal ? 'x' : 'y', startPositionsFrom);

    all.toChange = {
      ...all.toChange,
      ...result.toChange,
    };
    all.toRemove.push(...result.toRemove);

    return all;
  }, { toChange: {}, toRemove: [] } as Changes);

  return changes;
}
function getSortingMethod(isHorizontal: boolean, isReversed: boolean) {
  return (a: Tile, b: Tile) => {
    if (isHorizontal) {
      if (isReversed) return a.x - b.x;
      return b.x - a.x;
    }

    if (isReversed) return a.y - b.y;
    return b.y - a.y;
  };
}

// calculates changes for single group
// depending on direction group can be a single row or column
function calculateGroupChanges(tiles: Tile[], axis: 'x' | 'y', startFrom: number) {
  const toRemove: Changes['toRemove'] = [];
  const toChange: Changes['toChange'] = {};
  let position = 0;

  for (let i = 0; i < tiles.length; i++) {
    const current = tiles[i];
    if (isObstacle(current)) continue;

    const next = tiles[i + 1];
    const prev = i - 1 >= 0 ? tiles[i - 1] : null;
    // if previous was an obstacle then current cannot go past it, so update position
    if (prev && isObstacle(prev)) {
      position = getDirectionAwarePosition(prev[axis] + (startFrom === 0 ? 1 : -1), startFrom);
    }

    const directionAwarePosition = getDirectionAwarePosition(position, startFrom);
    const change: ChangeEntry = {
      [axis]: directionAwarePosition,
    };
    // should two neighbours be merged
    if (!!next && current.value === next.value) {
      change.value = 2 * current.value;

      toChange[next.id] = {
        [axis]: directionAwarePosition,
      };
      toRemove.push(next.id);
      // skip next one as it will be removed
      i++;
    }

    if (change[axis] !== current[axis] || change.value) {
      toChange[current.id] = change;
    }
    position++;
  }

  return {
    toChange,
    toRemove,
  };
}
function getDirectionAwarePosition(position: number, startFrom: number) {
  return startFrom === 0 ? position : (startFrom - position);
}

export function isObstacle(tile: Tile) {
  return tile.value === OBSTACLE_VALUE;
}

export function hasWon(changes: Changes['toChange'], winAt: number) {
  return Object.values(changes).some(({ value }) => value === winAt);
}
