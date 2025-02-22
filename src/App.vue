<script lang="ts" setup>
import ContainerLight from './components/container_light.vue'
import BoolState from './components/boolState.vue';
import enumState from './components/enumState.vue';
import intState from './components/intState.vue';
import furnture from './components/furnture.vue';
import { provide, ref } from 'vue';
provide('isDebug', ref(true));

</script>

<template>
  <header>

  </header>

  <main>
    <div id="app" style="height: 100vh; width: 100vw;">
      <furnture>
        <boolState />
        <enumState />
        <intState />
      </furnture>

    </div>
  </main>
</template>

<style scoped>

</style>
