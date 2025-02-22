<template>
  <div class="flex flex-col items-center justify-center bg-gray-50 p-4">
    <div class="inline-block relative w-full max-w-xs">
      <select
        v-model="selectedOption"
        class="w-full rounded-button bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 px-6 py-3 transition-all duration-200 ease-in-out transform active:scale-98 shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled selected>请选择选项</option>
        <option
          v-for="option in options"
          :key="option"
          :value="option"
          class="px-4 py-2 hover:bg-gray-50 text-gray-700"
        >
          {{ option }}
        </option>
      </select>
      
      <!-- 自定义下拉箭头 -->
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
        <i class="fa-solid fa-chevron-down text-sm text-gray-500"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const options = ['CCTV1', 'CCTV2', 'CCTV3', 'CCTV4', 'CCTV5', 'CCTV6', 'CCTV7', 'CCTV8', 'CCTV9', 'CCTV10'];
const selectedOption = ref('');
</script>

<style scoped>
/* 移除原生下拉箭头 */
select {
  background-image: none;
}

/* 移除激活时的缩放效果 */
select:active {
  transform: scale(1);
}

/* 自定义选项样式 */
option {
  padding: 0.5rem 1rem;
  cursor: pointer;
}

option:hover {
  background-color: #f9fafb;
}

option:checked {
  background-color: #eff6ff;
  color: #2563eb;
}
</style>