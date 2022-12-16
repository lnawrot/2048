<script setup lang="ts">
import type { Tile } from '@/stores/board';
import BaseTile from './TileBase.vue';
import { computed, onMounted, ref, watch } from 'vue';
import TileContent from './TileContent.vue';

const props = defineProps<{
  tile: Tile,
}>();

const zIndex = computed(() => Math.log2(props.tile.value));

const shouldAnimatePop = ref(false);
function startPopAnimation() {
  shouldAnimatePop.value = true;
}
function stopPopAnimation() {
  shouldAnimatePop.value = false;
}
onMounted(() => {
  startPopAnimation();
});
watch(() => props.tile.value, () => startPopAnimation());

function onTransitionEnd() {
  const event = new Event('movementFinished');
  document.dispatchEvent(event);
}
</script>

<template>
  <BaseTile
    class="transition"
    :x="props.tile.x"
    :y="props.tile.y"
    :style="{ zIndex }"
    @transitionend.self="onTransitionEnd"
  >
    <TileContent
      class="content"
      :class="{
        pop: shouldAnimatePop,
        [`value-${ props.tile.value }`]: true,
      }"
      @animationend="stopPopAnimation"
    >
      {{ tile.value }}
    </TileContent>
  </BaseTile>
</template>

<style lang="scss" scoped>
.transition {
  transition: transform 0.25s ease-in-out;
}

.content {
  transition: background-color 0.25s ease-in-out;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.5rem;
  font-weight: 600;
  color: white;
}

.pop {
  animation: pop 0.25s;
}
@keyframes pop {
  0%, 100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }
}

@mixin valueColor($value, $color) {
  .value-#{$value} {
    background-color: $color;
  }
}
@include valueColor(1, #00aa9f);
@include valueColor(2, #0075b5);
@include valueColor(4, #1f368a);
@include valueColor(8, #b98eae);
@include valueColor(16, #972586);
@include valueColor(32, #009366);
@include valueColor(64, #5a00bd);
@include valueColor(128, #bd009a);
@include valueColor(256, #0083bd);
@include valueColor(512, #fdefd5);
@include valueColor(1024, #c61818);
@include valueColor(2048, #0dff00);
</style>
