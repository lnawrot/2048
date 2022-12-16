<script setup lang="ts">
import GameConfig from '@/components/GameConfig/index.vue';
import GameBoard from '@/components/GameBoard.vue';
import { onBeforeUnmount, onMounted } from 'vue';
import { useBoardStore } from './stores/board';
import { isArrowKey } from './utils';

const board = useBoardStore();
function onKeyPress(event: KeyboardEvent) {
  if (document.activeElement && document.activeElement.tagName === 'INPUT') return;
  if (!isArrowKey(event.key)) return;

  board.handleMove(event.key);
}

onMounted(() => {
  document.addEventListener('keydown', onKeyPress);

  board.init();
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeyPress);
});
</script>

<template>
  <main>
    <GameConfig />
    <GameBoard />
  </main>
</template>
