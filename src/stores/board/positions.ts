import type { Tile } from '.';

export function getAvailablePositions(possible: Set<string>, tiles: Tile[]) {
  if (!tiles.length) return Array.from(possible);
  if (tiles.length === possible.size) return null;

  const available = new Set(possible);
  tiles.forEach(({ x, y }) => available.delete(getPositionKey(x, y)));

 return Array.from(available);
}


export function calculatePossiblePositions(rowsCount: number, columnsCount: number) {
  const rows = Array.from({ length: rowsCount }, (_, index) => index);
  const columns = Array.from({ length: columnsCount }, (_, index) => index);

  const possible = new Set<string>();
  rows.forEach((row) =>
    columns.forEach((column) =>
      possible.add(getPositionKey(column, row))
    )
  );

  return possible;
}

function getPositionKey(x: number, y: number) {
  return `${ x }_${ y }`;
}
export function parsePositionKey(position: string) {
  const [x, y] = position.split('_');
  return {
    x: +x,
    y: +y,
  };
}

