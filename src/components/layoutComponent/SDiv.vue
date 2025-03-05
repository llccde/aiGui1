<template>
    <div>
        <component :is="containerComponent">
            <slot id = "components">

            </slot>
        </component>
    </div>

</template>
  
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const props = defineProps<{
  styleClass?: string
}>()

// 支持的复杂样式组件列表
const complexStyles = ref(['smart_container','head_side_body_foot']) // 使用kebab-case

// 动态计算容器组件
const containerComponent = computed(() => {
  return complexStyles.value.includes(props.styleClass?.toLowerCase() || '') 
    ? props.styleClass?.toLowerCase()
    : 'div'
})
</script>