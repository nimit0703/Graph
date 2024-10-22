<template>
  <div class="container px-0">
    <div class="row vh-100 justify-content-between p-3 no-gutters">
      <div class="col-6 col-lg-9 d-flex flex-column">
        <div class="title d-flex mx-3 px-2">
          <h3 class="text-secondary">Automate your plan</h3>
        </div>
        <div class="draw-area border flex-grow-1 mx-3">
          <VueFlow 
            :nodes="nodes" 
            :edges="edges" 
            @nodeClick="onNodeSelect" 
            @nodeDragStop="nodeDragEvent"
            class="flow-container" 
            :nodeTypes="{ custom: CustomNode }" 
            :edgeTypes="{ custom: CustomEdge }"
            @connect="onConnect" 
            @nodesChange="onNodesChange">
            <Background />
            <MiniMap  
            zoomable
            :nodeColor="'#495057'" 
            />
            <Controls />
            <template #edge-button="buttonEdgeProps">
              <EdgeWithButton 
                :id="buttonEdgeProps.id" 
                :source-x="buttonEdgeProps.sourceX"
                :source-y="buttonEdgeProps.sourceY" 
                :target-x="buttonEdgeProps.targetX"
                :target-y="buttonEdgeProps.targetY" 
                :source-position="buttonEdgeProps.sourcePosition"
                :target-position="buttonEdgeProps.targetPosition" 
                :marker-end="buttonEdgeProps.markerEnd"
                :data="buttonEdgeProps.data"
                :style="buttonEdgeProps.style" />
            </template>
          </VueFlow>
        </div>
      </div>
      
      <div class="col-5 col-lg-3 d-flex flex-column">
        <div class="title d-flex mx-3 px-2 mt-2">
          <h3 class="text-secondary">Node Operations</h3>
        </div>
        <div class="toolbar p-3 border flex-grow-1">
          <div class="d-flex flex-column">
            <div class="d-flex justify-content-center mb-2">
              <button @click="addNode" class="btn btn-primary mx-2">Add Node</button>
              <button @click="deleteNode" :disabled="isButtonDisabled" class="btn btn-danger">Delete Node</button>
            </div>
            <hr class="text-white">
            <div v-if="selectedNode">
              <NodeForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useFlowStore } from './stores/flowStore';
import CustomNode from './CustomNode.vue';
import EdgeWithButton from './EdgeWithButton.vue';
import NodeForm from '@/views/NodeForm.vue';
import { VueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { MiniMap } from '@vue-flow/minimap'
import { Controls } from '@vue-flow/controls'

const flowStore = useFlowStore();
const { selectNode, addNode, deleteNode, updateNodePosition, connectNodes, deselectNode } = flowStore;

const isButtonDisabled = computed(() => flowStore.isButtonDisabled);
const nodes = computed(() => flowStore.nodes);
const edges = computed(() => flowStore.edges);
const selectedNode = computed(() => flowStore.selectedNode);

const onNodeSelect = ({ node }) => {
  selectNode(node);
};

const nodeDragEvent = ({ node }) => {
  updateNodePosition(node.id, node.position);
};

const onConnect = (params) => {
  connectNodes(params);
};

const onNodesChange = (changes) => {
  console.log(changes, "changed");
  const selected = changes.find(change => change.type === 'select');
  if (!(selected == undefined) && (selected.selected == false)) {
    deselectNode();
  }
};
</script>

<style >
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
  height: 100%;
}

.vue-flow__node {
  background: transparent !important;
}

.row {
  height: 100vh; /* Full viewport height */
}

.draw-area,
.toolbar {
  overflow: hidden; /* Prevent scrolling */
  height: 80%;
}

@media (max-width: 992px) {
  .toolbar {
    margin-bottom: 20px;
  }
}
</style>
