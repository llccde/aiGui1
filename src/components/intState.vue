<!-- 代码已包含 CSS：使用 TailwindCSS , 安装 TailwindCSS 后方可看到布局样式效果 -->
<template>
    <div class="flex flex-col items-center justify-center bg-gray-50">
        <div class="w-[150px] h-[75px]">
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-full">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-700">亮度</span>
                    <span class="text-gray-500 text-sm">{{ brightness }}%</span>
                </div>
                <div class="relative h-2 bg-gray-200 rounded-full">
                    <input
                        type="range"
                        v-model="brightness"
                        :min="minValue"
                        :max="maxValue"
                        class="range-slider absolute w-full h-full opacity-0 cursor-pointer"
                        @input="updateBrightness"
                    />
                    <div
                        class="absolute h-full bg-blue-500 rounded-full transition-all duration-150"
                        :style="{ width: `${brightness}%` }"
                    ></div>
                    <div
                        class="absolute h-4 w-4 bg-white border-2 border-blue-500 rounded-full -top-1 transition-all duration-150"
                        :style="{ left: `calc(${brightness}% - 8px)` }"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const minValue = ref(30);
const maxValue = ref(100);
const brightness = ref(50);

const updateBrightness = (event: Event) => {
    const target = event.target as HTMLInputElement;
    brightness.value = parseInt(target.value);
};
</script>

<style scoped>
.range-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: transparent;
    cursor: pointer;
}
</style>