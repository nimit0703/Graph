<script setup>
import { BaseEdge, EdgeLabelRenderer, getBezierPath, useVueFlow } from '@vue-flow/core'
import { computed } from 'vue'

// Define component props
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
  data: {
    type: Object,
    required: false,
  },
})

const { removeEdges } = useVueFlow()

const path = computed(() => getBezierPath(props))

// Function to calculate the mid-point of the edge
const midPoint = computed(() => ({
  x: (props.sourceX + props.targetX) / 2,
  y: (props.sourceY + props.targetY) / 2,
}))

// Function to handle edge click
const handleEdgeClick = () => {
  console.log(`Edge clicked: ${props.id}`)
}
</script>

<script>
export default {
  inheritAttrs: false,
}
</script>

<template>
  <!-- Custom edge with moving dashed line -->
  <BaseEdge 
    :id="id" 
    :path="path[0]" 
    :marker-end="markerEnd" 
    :style="{ 
      stroke: edgeColor, 
      strokeDasharray: '5, 5', 
      strokeDashoffset: '0', 
      animation: 'dash 1.5s linear infinite'
    }"  
    @click="handleEdgeClick"
  />

  <!-- Edge label renderer -->
  <EdgeLabelRenderer>
    <div 
      @click="handleEdgeClick"
      :style="{
        pointerEvents: 'all',
        position: 'absolute',
        transform: `translate(-50%, -50%) translate(${midPoint.x}px, ${midPoint.y}px) rotate(90deg)`
      }" 
      class="animated-edge-label"
    >
      <div class="row align-items-center">
        <div class="col text-white text-wrap" style="transform: rotate(-90deg); margin-bottom: 5px;"> <!-- Counter-rotate text for readability -->
          {{ data.text }}
        </div>
        <div class="col w-100">
          <button class="edgebutton btn rounded" @click="removeEdges(id)">×</button> <!-- Button positioned below text -->
        </div>
      </div>
    </div>
  </EdgeLabelRenderer>
</template>

<style scoped>
.animated-edge-label {
  /* Add any additional styles you need for your edge label */
}

/* Animate the dashes */
@keyframes dash {
  0% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -30; /* Adjust this value based on your strokeDasharray */
  }
}

.edgebutton {
  background: red; /* Button color */
  border: none; /* Remove border */
  color: white; /* Button text color */
  cursor: pointer; /* Pointer on hover */
  font-size: 16px; /* Button font size */
  padding: 2px 5px; /* Padding for the button */
  margin-top: 5px; /* Space between text and button */
}
</style>
