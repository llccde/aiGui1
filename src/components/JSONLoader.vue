<template>
  <div class="w-full h-96 overflow-auto" style="border: 3px solid #000;">
    <div>
      <input ref="apiName" type="text" style="border: 1px solid #000;" />
      <button @click="addComponent" style="border: 1px solid #000;">Add</button>
    </div>
    <ValueComponent v-for="{ indexId, apiName } in components" :dataApiName="apiName" :key="indexId" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import State_data_instance from '@/js/state_data_instance';
import ValueComponent from './states_test/ValueComponent.vue';

const sense = State_data_instance.stateInstancePack.getSense();
const components = ref([]);
const apiName = ref(null);

const addComponent = () => {
  let stateInterface = sense.getStateInterface(apiName.value.value);
  if (stateInterface == null) {
    alert("State with this name does not exist");
    return;
  }

  const newComponent = { indexId: components.value.length, apiName: apiName.value.value };
  components.value.push(newComponent);
};
</script>