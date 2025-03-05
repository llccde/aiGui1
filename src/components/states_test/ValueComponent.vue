<template>
  <div :dataApiName="dataApiName" ref="root">
    <component :is="componentType" :dataApiName="dataApiName" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import BoolButton from './BoolButton.vue';
import IntSlider from './IntSlider.vue';
import EnumList from './EnumList.vue';
import State_data_instance from "@/js/state_data_instance";

const props = defineProps({
  dataApiName: {
    type: String,
    required: true
  }
});

const root = ref(null);
const componentType = ref(null);

onMounted(() => {
  const stateInstance = State_data_instance.stateInstancePack.getInstance(State_data_instance.types.BOOL, props.dataApiName);
  const stateType = stateInstance.data.type;

  switch (stateType) {
    case State_data_instance.types.BOOL:
      componentType.value = BoolButton;
      break;
    case State_data_instance.types.INT:
      componentType.value = IntSlider;
      break;
    case State_data_instance.types.ENUM:
      componentType.value = EnumList;
      break;
    default:
      throw new Error(`Unknown state type: ${stateType}`);
  }
});
</script>