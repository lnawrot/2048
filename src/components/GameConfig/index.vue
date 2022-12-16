<script setup lang="ts">
import { GRID_MAX_SIZE, GRID_MIN_SIZE, OBSTACLES_MAX_COUNT } from '@/config';
import { useConfigStore } from '@/stores/config';
import NumberPicker from './NumberPicker.vue';

const config = useConfigStore();
</script>

<template>
  <section class="config">
    <h1>Config</h1>

    <label>
      Grid size:
    </label>
    <div>
      <NumberPicker
        :min="GRID_MIN_SIZE"
        :max="GRID_MAX_SIZE"
        :current="config.columnsCount"
        @change="(value) => config.updateColumnsCount(value)"
      />
      <span class="x">X</span>
      <NumberPicker
        :min="GRID_MIN_SIZE"
        :max="GRID_MAX_SIZE"
        :current="config.rowsCount"
        @change="(value) => config.updateRowsCount(value)"
      />
    </div>

    <label>
      Obstacles count:
    </label>
    <div>
      <NumberPicker
        :min="0"
        :max="OBSTACLES_MAX_COUNT"
        :current="config.obstaclesCount"
        @change="(value) => config.updateObstaclesCount(value)"
      />
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

label {
  font-size: 1.2rem;
}

.x {
  font-size: 1.5rem;
  margin: 0 8px;
}
</style>
