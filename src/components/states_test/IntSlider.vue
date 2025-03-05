<template>
  <div>
    <input type="range" :min="range.min" :max="range.max" v-model="value" @input="updateState" />
    <span>{{ value }}</span>
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
    const value = ref(0);
    const range = ref({ min: 0, max: 100 });
    const stateInstance = ref(null);
    const stateUpdate = inject('stateUpdate');

    const updateState = () => {
      stateInstance.value.setState(value.value);
      stateUpdate.value(props.dataApiName, value.value);
    };

    onMounted(() => {
      stateInstance.value = State_data_instance.stateInstancePack.getInstance(State_data_instance.types.INT, props.dataApiName);
      stateInstance.value.syncFromServer().then(() => {
        value.value = stateInstance.value.getState();
        range.value = stateInstance.value.getRange();
      });

      inject('stateUpdateReceiverRegister').value(props.dataApiName, (newVal) => {
        value.value = newVal;
      });
    });

    return {
      value,
      range,
      updateState
    };
  }
};
</script>
