<script setup lang="ts">
import { useConfigStore } from '@/stores/config';
import TileBase from './Tile/TileBase.vue';

const config = useConfigStore();
</script>

<template>
  <template
    v-for="y in config.rowsCount"
    :key="y"
  >
    <template
      v-for="x in config.columnsCount"
      :key="x"
    >
      <TileBase
        :x="(x - 1)"
        :y="(y - 1)"
      />
    </template>
  </template>
</template>
