<script setup lang="ts">
const props = defineProps<{
  min: number,
  max: number,
  current: number,
}>();

defineEmits<{
  (e: 'change', value: number): void
}>();

const values = Array.from({ length: props.max - props.min + 1 }, (_, index) => props.min + index);
</script>

<template>
  <template
    v-for="value in values"
    :key="value"
  >
    <button
      class="value"
      :class="{ active: props.current === value }"
      @click="$emit('change', value)"
    >
      {{ value }}
    </button>
  </template>
</template>

<style lang="scss" scoped>
.value {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  padding: 1rem 1.5rem;
  margin: 0 5px;
  background-color: silver;
  color: white;
  outline: 0;
  border: none;
  border-radius: 7px;
  cursor: pointer;

  &.active {
    background-color: orangered;
  }
}
</style>
