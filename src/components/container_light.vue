<template>
    <div :style="{ display: 'flex', backgroundColor: color }">
        <div>
            <slot name="light_button">
                <p> no component here</p>
            </slot>
        </div>
        <br/>
        <div>
            <slot name="light_label">
                <p> no component here</p>
            </slot>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted, provide, onUnmounted } from 'vue'
    const color = ref("black");
    const changeColor = (color) => {
        color.value = "red";
    }
</script>