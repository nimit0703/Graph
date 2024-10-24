<script setup>
import { BaseEdge, EdgeLabelRenderer, getBezierPath, useVueFlow } from '@vue-flow/core';
import { computed, watch } from 'vue';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  sourceX: {
    type: Number,
    required: true,
  },
  sourceY: {
    type: Number,
    required: true,
  },
  targetX: {
    type: Number,
    required: true,
  },
  targetY: {
    type: Number,
    required: true,
  },
  sourcePosition: {
    type: String,
    required: true,
  },
  targetPosition: {
    type: String,
    required: true,
  },
  markerEnd: {
    type: String,
    required: false,
  },
  style: {
    type: Object,
    required: false,
  },
});

const { removeEdges } = useVueFlow();

const path = computed(() => getBezierPath(props));

watch(
  [() => props.sourceX, () => props.sourceY, () => props.targetX, () => props.targetY],
  () => {
    path.value = getBezierPath(props);
  }
);

// Handler for edge click
const handleEdgeClick = () => {
  console.log(`Edge ${props.id} clicked`);
  // Add any additional logic for edge selection here
};
</script>

<template>
  <!-- Updated BaseEdge with pointerEvents and stroke width -->
  <BaseEdge
    :id="id"
    :path="path[0]"
    :marker-end="markerEnd"
    @click="handleEdgeClick"
  />

  <!-- Custom label for removing the edge -->
  <EdgeLabelRenderer>
    <div
      :style="{
        pointerEvents: 'all',
        position: 'absolute',
        transform: `translate(-50%, -50%) translate(${path[1]}px,${path[2]}px)`,
      }"
      class=""
    >
      <button class="edgebutton" @click="removeEdges(id)">×</button>
    </div>
  </EdgeLabelRenderer>
</template>

<style scoped>
.edgebutton {
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  font-size: 12px;
}

</style>
