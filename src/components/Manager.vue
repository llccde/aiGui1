<template>
    <slot></slot>
    
</template>

<script lang="ts" setup>

import { data } from 'jquery';
import { comma } from 'postcss/lib/list';
import { provide, ref, onMounted } from 'vue';
import smart_container from './layoutComponent/smart_container.vue';
provide('isDebug', ref(true));
provide("build_component",ref(true));
    
</script>