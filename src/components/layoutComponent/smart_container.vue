<script setup>

import { useSlots, computed } from 'vue'
import forEachComponentInSlot from '@/ts/complexStyle'
const slots = useSlots()

// 分类处理插槽内容
const groupedSlots = computed(() => {
  const groups = { head: [], body: [], bottom: [] }
  
  // 遍历所有插槽内容
  slots.default?.()[0].children.forEach((vnode) => {
    // 获取 position 属性，默认为 body
    const position = vnode.props?.position || 'body'
    
    // 根据 position 分配到对应分组，无效值默认到 body
    if (groups[position]) {
      groups[position].push(vnode)
    } else {
      groups.body.push(vnode)
    }
  })
  return groups
  
})
</script>

<template>
  <div class="container">
    <!-- 头部区域 -->
    <div v-if="groupedSlots.head.length" class="head">
      <component :is="child" v-for="(child, index) in groupedSlots.head" :key="index" />
    </div>

    <!-- 主体区域 -->
    <div v-if="groupedSlots.body.length" class="body">
      <component :is="child" v-for="(child, index) in groupedSlots.body" :key="index" />
    </div>

    <!-- 底部区域 -->
    <div v-if="groupedSlots.bottom.length" class="bottom">
      <component :is="child" v-for="(child, index) in groupedSlots.bottom" :key="index" />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.head {
  /* 根据需求添加样式 */
}

.body {
  flex: 1;
  overflow: auto;
}

.bottom {
  /* 根据需求添加样式 */
}
</style>