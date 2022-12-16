<script setup lang="ts">
import { useConfigStore } from '@/stores/config';
import { computed } from 'vue';
import TileContent from './TileContent.vue';

const props = defineProps<{
  x: number,
  y: number,
}>();

const translate = computed(() => `translate(${ 100 * props.x }%, ${ 100 * props.y }%)`);
const dimensions = computed(() => {
  const config = useConfigStore();
  return {
    width: `${ config.tileSize }px`,
    height: `${ config.tileSize }px`,
  };
});
</script>

<template>
  <div
    class="field"
    :style="{
      transform: translate,
      ...dimensions,
    }"
  >
    <slot>
      <TileContent />
    </slot>
  </div>
</template>

<style scoped>
.field {
  position: absolute;
  padding: 8px;
  box-sizing: border-box;
}
</style>
