<script setup lang="ts">
import { useBoardStore } from '@/stores/board';
import { useConfigStore } from '@/stores/config';
import { debounce } from 'lodash-es';
import { computed, onBeforeMount, onBeforeUnmount } from 'vue';
import GameBackground from './GameBackground.vue';
import TileActive from './Tile/TileActive.vue';
import TileObstacle from './Tile/TileObstacle.vue';

const config = useConfigStore();
const board = useBoardStore();

const onResize = debounce(() => {
  config.availableBoardWidth = 0.8 * window.innerWidth;
}, 250);
onBeforeMount(() => {
  onResize();
  onResize.flush();
  window.addEventListener('resize', onResize);
});
onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize);
});

const dimensions = computed(() => ({
  width: `${ config.columnsCount * config.tileSize }px`,
  height: `${ config.rowsCount * config.tileSize }px`,
}));
</script>

<template>
  <section>
    <h1>Game</h1>
    <div class="board" :style="dimensions">
      <GameBackground />

      <template
        v-for="tile in board.tiles"
        :key="tile.id"
      >
        <component
          :is="board.isObstacle(tile) ? TileObstacle : TileActive"
          :tile="tile"
        />
      </template>
    </div>
  </section>
</template>

<style scoped>
h1 {
  font-size: 3rem;
  margin: 0;
  text-align: center;
}
.board {
  position: relative;
  background-color: #eee;
  padding: 15px;
  border-radius: 15px;
  margin: 0 auto;
}
</style>
