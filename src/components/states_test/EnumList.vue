<template>
  <div>
    <select v-model="value" @change="updateState">
      <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
    </select>
  </div>
</template>

<script>
import { ref, onMounted, inject } from 'vue';
import State_data_instance from "@/js/state_data_instance";
import { data } from 'jquery';

export default {
  props: {
    dataApiName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const value = ref("");
    const options = ref([]);
    const stateInstance = ref(null);
    const stateUpdate = inject('stateUpdate');

    const updateState = () => {
      stateInstance.value.setState(value.value);
      stateUpdate.value(props.dataApiName, value.value);
    };

    onMounted(() => {
      stateInstance.value = State_data_instance.stateInstancePack.getInstance(State_data_instance.types.ENUM, props.dataApiName);
      stateInstance.value.syncFromServer().then(() => {
        value.value = stateInstance.value.getState();
        options.value = stateInstance.value.getOptions();
      });

      inject('stateUpdateReceiverRegister').value(props.dataApiName, (newVal) => {
        value.value = newVal;
      });
    });

    return {
      value,
      options,
      updateState
    };
  }
};
</script>
