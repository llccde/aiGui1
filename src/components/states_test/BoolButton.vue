<template>
  <div>
    <button @click="toggleState">{{ value ? 'On' : 'Off' }}</button>
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
    const value = ref(false);
    const stateInstance = ref(null);
    const stateUpdate = inject('stateUpdate');

    const toggleState = () => {
      value.value = !value.value;
      stateInstance.value.setState(value.value);
      stateUpdate.value(props.dataApiName, value.value);
    };

    onMounted(() => {
      stateInstance.value = State_data_instance.stateInstancePack.getInstance(State_data_instance.types.BOOL, props.dataApiName);
      stateInstance.value.syncFromServer().then(() => {
        value.value = stateInstance.value.getState();
      });
      
      inject('stateUpdateReceiverRegister').value(props.dataApiName, 

      (newVal)=>{
        value.value = newVal;
        
      });
    });

    return {
      stateInstance,
      value,
      toggleState
    };
  }
};
</script>
