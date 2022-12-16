<script setup lang="ts">
import { GRID_MAX_SIZE, GRID_MIN_SIZE, OBSTACLES_MAX_COUNT } from '@/config';
import { useConfigStore } from '@/stores/config';


const possibleObstaclesCount = Array.from({ length: OBSTACLES_MAX_COUNT + 1 }, (_, index) => index);

const config = useConfigStore();

function onInput(event: Event, handle: (value: number) => void) {
  const target = event.target as HTMLInputElement;
  handle(target.valueAsNumber);
}
</script>

<template>
  <section class="config">
    <h1>Config</h1>

    <label>
      Grid size:
    </label>
    <div>
      <input
        type="number"
        :min="GRID_MIN_SIZE"
        :max="GRID_MAX_SIZE"
        :value="config.columnsCount"
        @input="(event) => onInput(event, config.updateColumnsCount)"
      />
      x
      <input
        type="number"
        :min="GRID_MIN_SIZE"
        :max="GRID_MAX_SIZE"
        :value="config.rowsCount"
        @input="(event) => onInput(event, config.updateRowsCount)"
      />
    </div>

    <label>
      Obstacles count:
    </label>
    <div>
      <template
        v-for="count in possibleObstaclesCount"
        :key="count"
      >
        <button
          class="obstacle"
          :class="{ active: config.obstaclesCount === count }"
          @click="config.updateObstaclesCount(count)"
        >
          {{ count }}
        </button>
      </template>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.config {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  margin-bottom: 24px;
}

h1 {
  font-weight: 700;
  font-size: 2rem;
  margin: 0;
  padding: 0;
}
label {
  margin-top: 16px;
}

input {
  padding: 0.75rem 1rem;
  font-size: 1.5rem;
  border-radius: 8px;
  border: 1px solid silver;
  width: fit-content;
  text-align: center;
}

.obstacle {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 1.5rem;
  padding: 1rem 1.5rem;
  margin: 0 5px;
  background-color: silver;
  color: white;
  outline: 0;
  border: none;
  border-radius: 7px;
  cursor: pointer;

  &.active {
    background-color: orange;
  }
}
</style>
