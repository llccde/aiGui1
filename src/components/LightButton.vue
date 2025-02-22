<template>
  <button ref="el" class="light-button" @click="toggle"> >
    {{ status ? 'ON' : 'OFF' }}
  </button>
</template>

<script lang="ts" setup>
import { ref, onMounted,inject } from 'vue'

const registerComponent = inject('api_register', (node,type) => {});

const el = ref(null)
const status = ref(false)
//这里将组件加载到父节点中
onMounted(() => {
  if (el.value) {
      registerComponent(el.value,"light-button");
  }
})
function toggle() {
  status.value = !status.value
}
</script>