// composables/useSlotGrouping.ts
import { computed, useSlots } from 'vue'

type GroupConfig = {
  groups: string[]
  defaultGroup: string
  positionProp?: string
}

export default function useSlotGrouping(config: GroupConfig) {
  const slots = useSlots()
  
  return computed(() => {
    const groups = config.groups.reduce((acc, group) => {
      acc[group] = []
      return acc
    }, {} as Record<string, any[]>)

    slots.default?.().forEach((vnode) => {
      const position = vnode.props?.[config.positionProp || 'position'] || config.defaultGroup
      const validGroup = groups.hasOwnProperty(position) ? position : config.defaultGroup
      groups[validGroup].push(vnode)
    })

    return groups
  })
}