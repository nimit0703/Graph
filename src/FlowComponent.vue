<template>
    <div class="toolbar">
      <button @click="addNode" :disabled="isButtonDisabled">Add Node</button>
      <button @click="deleteNode" :disabled="isButtonDisabled">Delete Node</button>
    </div>
  
    <VueFlow
      :nodes="nodes"
      :edges="edges"
      @nodeClick="onNodeSelect"
      @nodeDragStop="nodeDragEvent"
      class="flow-container"
      :nodeTypes="{ custom: CustomNode }"
    >
      <Background />
    </VueFlow>
  </template>
  
  <script setup>
  import {computed} from 'vue'
  import { VueFlow } from '@vue-flow/core';
  import { Background } from '@vue-flow/background';
  import { useFlowStore } from './stores/flowStore';
  import CustomNode from './CustomNode.vue';
  
  const flowStore = useFlowStore();
  const {selectNode, addNode, deleteNode, updateNodePosition } = flowStore;

  const isButtonDisabled = computed(() => flowStore.isButtonDisabled);
  const nodes = computed(() => flowStore.nodes);
  const edges = computed(() => flowStore.edges);

  const onNodeSelect = ({ event, node }) => {
    selectNode(node.id);
  };
  const nodeDragEvent = ({ event, node }) => {
    console.log("drag stoped: " + event + " " + node); ;
    updateNodePosition(node.id, node.position)
    // selectNode(node.id);
  };
  </script>
  
  <style>
  .toolbar {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
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
  </style>
  