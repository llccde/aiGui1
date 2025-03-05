<script lang="ts" setup>

import { provide, ref } from 'vue';
import ApiTest from './components/ApiTest.vue';
import defaultLayout from './components/layoutComponent/defaultLayout.vue';
import smart_container from './components/layoutComponent/smart_container.vue';
import SDiv from './components/layoutComponent/SDiv.vue';
provide('isDebug', ref(true));
</script>

<template>
  <header>

  </header>

  <main>
    
    <div id="app" style="height: 100vh; width: 100vw;">
      <SDiv style-class = "head_side_body_foot">
        <p position="header">bottom</p>
        <p position="header">head</p>
        <p position="sidebar">side</p>
        <p position="main">main</p>
        <p position="footer">footer</p>
      </SDiv>

      
    </div>
  </main>
</template>

<style scoped>

</style>


