<template>
    <div class="toolbar">
      <button @click="addNode" :disabled="isButtonDisabled">Add Node</button>
      <button @click="deleteNode" :disabled="isButtonDisabled">Delete Node</button>
    </div>
  
    <VueFlow
      :nodes="nodes"
      :edges="edges"
      @nodeClick="onNodeSelect"
      class="flow-container"
      :nodeTypes="{ custom: CustomNode }"
    >
      <Background />
    </VueFlow>
  </template>
  
  <script setup>
  import {computed} from 'vue'
  import { VueFlow } from '@vue-flow/core';
  import { useFlowStore } from './stores/flowStore';
  import CustomNode from './CustomNode.vue';
  
  const flowStore = useFlowStore();
  const {selectNode, addNode, deleteNode } = flowStore;

  const isButtonDisabled = computed(() => flowStore.isButtonDisabled);
  const nodes = computed(() => flowStore.nodes);
  const edges = computed(() => flowStore.edges);

  const onNodeSelect = ({ event, node }) => {
    debugger
    selectNode(node.id);
  };
  </script>
  
  <style>
  .toolbar {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
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
  