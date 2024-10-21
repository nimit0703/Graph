<template>
  <div :class="['custom-node', { 'selected-node': isSelected }]">
    {{ data.label }}
    <div v-if="isSelected" class="selection-indicator"></div>
    
    <!-- Customized Handle for the source (bottom) -->
    <Handle
      id="custom-source"
      type="source"
      position="bottom"
      :style="{ width: '15px', height: '15px', background: '#1dfa9e', border: '2px solid #333', borderRadius: '50%' }"
    >
      <span class="handle-label">⬇</span>
    </Handle>
    
    <!-- Customized Handle for the target (top) -->
    <Handle
      id="custom-target"
      type="target"
      position="top"
      :style="{ width: '15px', height: '15px', background: '#ff6347', border: '2px solid #333', borderRadius: '50%' }"
    >
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
  font-size: 12px;
  color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
