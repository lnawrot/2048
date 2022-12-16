import { GRID_DEFAULT_SIZE, GRID_MAX_SIZE, GRID_MIN_SIZE, OBSTACLES_DEFAULT_COUNT, TILE_MAX_SIZE } from '@/config';
import { defineStore } from 'pinia';
import { computed, ref, type Ref } from 'vue';
import { useBoardStore } from './board';

export const useConfigStore = defineStore('config', () => {
  const availableBoardWidth = ref(0);
  const rowsCount = ref(GRID_DEFAULT_SIZE);
  const columnsCount = ref(GRID_DEFAULT_SIZE);
  const obstaclesCount = ref(OBSTACLES_DEFAULT_COUNT);

  function update(variable: Ref<number>, value: number) {
    variable.value = value;
    resetGame();
  }
  function updateRowsCount(value: number) {
    if (!isValidGridSize(value)) return;

    update(rowsCount, value);
  }
  function updateColumnsCount(value: number) {
    if (!isValidGridSize(value)) return;

    update(columnsCount, value);
  }
  function updateObstaclesCount(value: number) {
    update(obstaclesCount, value);
  }

  function resetGame() {
    useBoardStore().init();
  }

  const maxIndexes = computed(() => ({
    rows: rowsCount.value - 1,
    columns: columnsCount.value - 1,
  }));

  const tileSize = computed(() =>
    Math.min(availableBoardWidth.value / columnsCount.value, TILE_MAX_SIZE)
  );

  return {
    availableBoardWidth,
    rowsCount,
    columnsCount,
    obstaclesCount,

    updateRowsCount,
    updateColumnsCount,
    updateObstaclesCount,

    maxIndexes,
    tileSize,
  };
});

function isValidGridSize(value: number) {
  if (Number.isNaN(value)) return false;
  if (typeof value !== 'number') return false;

  return GRID_MIN_SIZE <= value && value <= GRID_MAX_SIZE;
}
