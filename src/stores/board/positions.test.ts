import { describe, expect, it } from 'vitest';
import { calculatePossiblePositions, getAvailablePositions } from './positions';

describe('board positions', () => {
  it('calculates possible positions', () => {
    const possible = calculatePossiblePositions(2, 3);
    expect(possible).toMatchInlineSnapshot(`
      Set {
        "0_0",
        "1_0",
        "2_0",
        "0_1",
        "1_1",
        "2_1",
      }
    `);
  });

  it('returns avilable positions', () => {
    const possible = calculatePossiblePositions(2, 2);

    expect(getAvailablePositions(possible, [])).toMatchInlineSnapshot(`
      [
        "0_0",
        "1_0",
        "0_1",
        "1_1",
      ]
    `);

    const allPositionsTaken = [
      { id: '1', x: 0, y: 0, value: 2 },
      { id: '2', x: 1, y: 0, value: 2 },
      { id: '3', x: 0, y: 1, value: 2 },
      { id: '4', x: 1, y: 1, value: 2 },
    ];
    expect(getAvailablePositions(possible, allPositionsTaken)).toEqual(null);

    allPositionsTaken.shift();
    expect(getAvailablePositions(possible, allPositionsTaken)).toMatchInlineSnapshot(`
      [
        "0_0",
      ]
    `);
  });
});

