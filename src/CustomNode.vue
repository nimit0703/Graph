<template>
  <div :class="['custom-node', { 'selected-node': isSelected }]">
    {{ data.label }}
    <div v-if="isSelected" class="selection-indicator"></div>

    <Handle id="custom-source" type="source" position="bottom"
      @mousedown="console.log('source handle clicked')">
      <span class="handle-label">⬇</span>
    </Handle>

    <Handle id="custom-target" type="target" position="top"
      @mousedown="console.log('target handle clicked')">
      <span class="handle-label">⬆</span>
    </Handle>

  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Handle } from '@vue-flow/core'; // Import the Handle component
import { useFlowStore } from './stores/flowStore';

// Props passed by Vue Flow
const props = defineProps({
  id: String,
  data: Object,
  selected: Boolean,
});

const flowStore = useFlowStore();
const isSelected = computed(() => flowStore.selectedNode === props.id);
</script>

<style scoped>
.custom-node {
  border: 4px solid #ccc;
  border-radius: 24px;
  background-color: #fff;
  padding: 12px;
  text-align: center;
  position: relative;
  transition: all 0.2s ease-in-out;
  font-size: 14px;
  color: #333;
  min-width: 12vw;
}

.selected-node {
  border: 3px solid #00bcd4;
}

.selection-indicator {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 10px;
  height: 10px;
  background-color: #00bcd4;
  border-radius: 50%;
}

.handle-label {
  /* font-size: 12px;
  color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
}
</style>
