<script setup lang="ts">
import type { Tile } from '@/stores/board';
import BaseTile from './TileBase.vue';
import TileContent from './TileContent.vue';

const props = defineProps<{
  tile: Tile,
}>();
</script>

<template>
  <BaseTile
    :x="props.tile.x"
    :y="props.tile.y"
  >
    <TileContent class="content" />
  </BaseTile>
</template>

<style lang="scss" scoped>
.content {
  background-color: dimgray;
}
</style>
