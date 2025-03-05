import { useSlots, VNode } from "vue";

export default function forEachComponentInSlot(slots){
    const defaultSlot = slots.default?.() || []
  
    const targetVNode = defaultSlot.find(vnode => 
        vnode.props?.id === 'components'
      ) ?? defaultSlot[0]
    
      if (!targetVNode) {
        console.warn('No valid slot content found')
        return
      }
    
      // 处理子节点
      const children = Array.isArray(targetVNode.children) 
        ? targetVNode.children
        : [targetVNode.children]
    return children.forEach;
    
}