<template>
  <div
    :class="['custom-node', { 'selected-node': isSelected }]"
  >
    {{ data.label }}
    <div v-if="isSelected" class="sparkles"></div> <!-- Sprinkling effect -->
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useFlowStore } from './stores/flowStore';

// Props passed by Vue Flow
const props = defineProps({
  id: String,
  data: Object,
  selected: Boolean,
});

const flowStore = useFlowStore();

// Computed property to check if the node is selected
const isSelected = computed(() => flowStore.selectedNode === props.id);
</script>

<style scoped>
.custom-node {
  border-style: groove;
  border: 2px solid #bea3a3;
  border-radius: 11%;
  background-color: #b7ffbd;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  transition: all 0.3s ease; /* Smooth transition for size change */
}

.selected-node {
  border: 3px solid #1dfa9e; /* Light golden color */
  animation: pulseBorder 1.5s infinite linear, scaleUp 0.3s ease forwards;
}

/* Moving border animation */
@keyframes pulseBorder {
  0% {
    box-shadow: 0 0 10px #1dfa9e, 0 0 20px #1dfa9e, 0 0 30px #1dfa9e;
  }
  50% {
    box-shadow: 0 0 20px #1dfa9e, 0 0 40px #1dfa9e, 0 0 60px #1dfa9e;
  }
  100% {
    box-shadow: 0 0 10px #1dfa9e, 0 0 20px #1dfa9e, 0 0 30px #1dfa9e;
  }
}

/* Scale up the node */
@keyframes scaleUp {
  to {
    transform: scale(1.7); /* Increase size by 10% */
  }
}

/* Sprinkling effect */
.sparkles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.sparkles::before,
.sparkles::after {
  content: '';
  position: absolute;
  width: 3px;
  height: 3px;
  background: #931dfa; /* Light golden color */
  border-radius: 50%;
  animation: sparkle 1.5s infinite ease-in-out;
}

.sparkles::before {
  top: 20%;
  left: 50%;
  animation-delay: 0.3s;
}

.sparkles::after {
  top: 50%;
  left: 20%;
  animation-delay: 0.6s;
}

/* Sprinkling animation */
@keyframes sparkle {
  0%, 100% {
    transform: translateY(0) translateX(0);
    opacity: 1;
  }
  50% {
    transform: translateY(-10px) translateX(10px);
    opacity: 0;
  }
}
</style>
