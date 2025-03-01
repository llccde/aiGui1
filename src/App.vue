<script lang="ts" setup>

import JSONLoader from './components/JSONLoader.vue';
import { provide, ref } from 'vue';
import Manager from './components/Manager.vue';
import FlagOutput from  "./ts/FlagOutPut";
import ApiTest from './components/ApiTest.vue';
provide('isDebug', ref(true));
</script>

<template>
  <header>

  </header>

  <main>
    
    <div id="app" style="height: 100vh; width: 100vw;">
      <Manager >  
        <JSONLoader />
      </Manager>
      <!-- <ApiTest /> -->
      
    </div>
  </main>
</template>

<style scoped>

</style>


