<template>
  <div>
    <slot></slot>
  </div>
</template>

<script  setup>
import { ref, reactive, onMounted, provide, onUnmounted } from 'vue'
  const components = ref([]);
  const registerComponent = (node,type) => {
    components.value.push({node,type});
    alert(type);
    alert(node);
  };
  provide('dynamic-container-register', registerComponent);
</script>
