<!-- 代码已包含 CSS：使用 TailwindCSS , 安装 TailwindCSS 后方可看到布局样式效果 -->
<template>
  <div class="bg-white rounded-xl shadow-lg p-6" :style="{ width: '400px', maxWidth: '800px' }">
    <div class="flex items-center mb-6">
      <div class="w-16 h-16 rounded-lg overflow-hidden mr-4">
        <img
          :src="tvImage"
          alt="Smart TV"
          class="object-cover"
        />
      </div>
      <div>
        <h3 class="text-lg font-semibold text-gray-800">智能电视</h3>
        <p class="text-sm text-gray-500">娱乐</p>
      </div>
      <div v-if="isDebug">
        <button @click="mfromJson()" style=" ">{{cou}}</button>
        <input  type="text" name="fromJSON" ref="jsonInput"  class="ml-auto w-1/2 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500" />
        <select ref="componentType">
          <option value="bool">bool</option>
          <option value="int">int</option>
          <option value="enum">enum</option>
        </select>
      </div>
    </div>
    
    <div class="flex flex-wrap gap-4">
      <slot></slot>
      <boolstate/>
      <component :is="boolstate"/>
      <component 
        v-for="component in components" 
        :key="component.id"
        :is="isComponent(component.type)" 
        :JSON="component.JSON"
      />

    </div>
  </div>
</template>

<script lang="ts" setup>
import { fromJSON } from 'postcss';
import { inject, ref } from 'vue';
import boolstate from './boolState.vue';
const tvImage = 'https://ai-public.mastergo.com/ai/img_res/7729d39120161cb8989d1fb26e385bc8.jpg';
const isDebug = inject('isDebug');
const components = [{id:0,type: "bool", JSON: "{\"name\":\"开启\",\"type\":\"bool\",\"description\":\"开启或关闭电视\",\"data_api_name\":\"tv_power_living_room\"}"}];
const cou = ref(0);
const jsonInput = ref(null);
const componentType = ref(null);
const mfromJson = () => {
  components.push({id:components.length, type: componentType.value.value, JSON: jsonInput.value.value });
  cou.value++;
};
const isComponent = (type) => {
  switch(type) {
    case "bool":
      alert("bool");
      return "boolstate";
    case "int":
      alert("int");
      return "intState";
    case "enum":
      alert("enum");
      return "enumState";
    default:
      alert("default");
      return "boolState";
  }
};
</script>

<style scoped>
</style>
