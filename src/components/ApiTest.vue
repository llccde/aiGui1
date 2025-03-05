<template>
  <div>
    <button @click="callApi">Call API</button>
    <button > </button>
    <div v-if="response">
      <h3>API Response:</h3>
      <pre>{{ response }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ComponentBuilder from '@/ts/ComponentBuilder';
import VC_DescribeData from './valueComponent/VC_DescribeData';
import BC_DescribeData from './basicComponent/BC_DescribeData';
import LC_DescribeData from './layoutComponent/LC_DescribeData';
const response = ref("hello");
const promote = VC_DescribeData.promote;
const callApi = async () => {
  const builder = new ComponentBuilder();
  await builder.whatToDo();
};
</script>
