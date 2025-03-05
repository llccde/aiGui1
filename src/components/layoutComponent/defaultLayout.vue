<template>
    <div style="width: 800px; height: 1200px; margin: 30px auto; display: flex; flex-wrap: wrap; justify-content: space-between; align-content: flex-start;">
        <component v-if="false" v-for="(th_component_name, index) in component_name" :is="th_component_name" :key="index"/>
    </div>

</template>

<script setup lang="ts">
import ComponentBuilder from '@/ts/ComponentBuilder';
import { onMounted, ref, Ref } from 'vue';
    const component_name:Ref<string[]> = ref([]);
    const listMode:Ref<boolean> = ref(true);    
    onMounted(()=>{
        let ai:ComponentBuilder = new ComponentBuilder();
        ai.callApi("html 的常用自闭合标签有哪些,请以jsonBegin~{\"useful_self_close_tag\":[\"tag1\",\"tag2\"]}~jsonEnd的格式回复")
            .then((response) => {
            console.log(response);
            const jsonString = response.match(/jsonBegin~(.*)~jsonEnd/)[1];
            const jsonResponse = JSON.parse(jsonString);
            component_name.value = jsonResponse.useful_self_close_tag;
            })
            .catch((error) => {
            console.error(error);
            });
    });
    
</script>