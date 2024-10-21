<template>
  <div class="row h-100">
    <div class="col-sm-9 col-lg-9">
      <div class="title d-flex mx-3 px-2 mt-2">
        <h3 class="text-secondary">Automate your plan</h3>
      </div>
      <div class="draw-area p-2 border h-100 mx-3">
        <VueFlow :nodes="nodes" :edges="edges" @nodeClick="onNodeSelect" @nodeDragStop="nodeDragEvent"
          class="flow-container" :nodeTypes="{ custom: CustomNode }" :edgeTypes="{ custom: CustomEdge }"
          @connect="onConnect">
          <Background />
          <template #edge-button="buttonEdgeProps">
            <EdgeWithButton :id="buttonEdgeProps.id" :source-x="buttonEdgeProps.sourceX"
              :source-y="buttonEdgeProps.sourceY" :target-x="buttonEdgeProps.targetX"
              :target-y="buttonEdgeProps.targetY" :source-position="buttonEdgeProps.sourcePosition"
              :target-position="buttonEdgeProps.targetPosition" :marker-end="buttonEdgeProps.markerEnd"
              :data="buttonEdgeProps.data"
              :style="buttonEdgeProps.style" />
          </template>
        </VueFlow>
      </div>
    </div>
    <div class="col-sm-3 col-lg-3 ml-3 h-100">
      <div class="title d-flex mx-3 px-2 mt-2">
        <h3 class="text-secondary">Node Operations</h3>
      </div>
      <div class="toolbar h-100 my-2">
        <div class="d-flex flex-column px-4 py-2">
          <div class="d-flex justify-content-center">
            <button @click="addNode" class="btn btn-primary">Add Node</button>
            <button @click="deleteNode" :disabled="isButtonDisabled" class="btn btn-danger">Delete Node</button>
          </div>
          <hr class="text-white">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Background } from '@vue-flow/background';
import { useFlowStore } from './stores/flowStore';
import CustomNode from './CustomNode.vue';
import EdgeWithButton from './EdgeWithButton.vue';
import { VueFlow } from '@vue-flow/core';

const flowStore = useFlowStore();
const { selectNode, addNode, deleteNode, updateNodePosition, connectNodes } = flowStore;

const isButtonDisabled = computed(() => flowStore.isButtonDisabled);
const nodes = computed(() => flowStore.nodes);
const edges = computed(() => flowStore.edges);

const onNodeSelect = ({ node }) => {
  selectNode(node.id);
};

const nodeDragEvent = ({ node }) => {
  updateNodePosition(node.id, node.position);
};

const onConnect = (params) => {
  connectNodes(params);
};
</script>

<style>
.toolbar {
  border: 1px solid rgb(177, 177, 177);
  padding: 5px;
}

button {
  margin-left: 10px;
}

.flow-container {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.vue-flow__node {
  background: transparent;
}
</style>
