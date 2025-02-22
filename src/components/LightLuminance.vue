<template>
  <div ref="el">
    <label for="luminance" class="mr-2">亮度:</label>
    <input id="luminance" type="range" min="0" max="100" class="w-full">
  </div>
</template>

<script lang="ts" setup>
import { onMounted, inject, ref } from 'vue';

const registerComponent = inject('api_register', (node, type) => {});

const el = ref(null);
const componentType = 'light-luminance';

onMounted(() => {
  if (el.value) {
    registerComponent(el.value, componentType);
  }
});
</script>

<style scoped>
input {
  cursor: pointer;
}
</style>
