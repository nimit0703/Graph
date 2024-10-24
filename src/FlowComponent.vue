<template>
  <div class="container py-0">
    <div class="no-gutters row p-0">
      <!-- Main Flow Area -->
      <div class="col-12 col-lg-9 d-flex flex-column flex-grow-1 draw-box">
        <div class="title d-flex mx-3 px-2">
          <h3 class="text-secondary">Automate your plan</h3>
        </div>
        <div class="draw-area border flex-grow-1 mx-3" :key="nodes">
          <VueFlow :nodes="nodes" :edges="edges" @nodeClick="onNodeSelect" @nodeDragStop="nodeDragEvent"
            class="flow-container" :nodeTypes="{ custom: CustomNode }" :edgeTypes="{ custom: CustomEdge }"
            @connect="onConnect" @nodesChange="onNodesChange">
            <Background />
            <MiniMap zoomable :nodeColor="'#495057'" />
            <Controls />
            <template #edge-button="buttonEdgeProps">
              <EdgeWithButton :id="buttonEdgeProps.id" :source-x="buttonEdgeProps.sourceX"
                :source-y="buttonEdgeProps.sourceY" :target-x="buttonEdgeProps.targetX"
                :target-y="buttonEdgeProps.targetY" :source-position="buttonEdgeProps.sourcePosition"
                :target-position="buttonEdgeProps.targetPosition" :marker-end="buttonEdgeProps.markerEnd"
                :data="buttonEdgeProps.data" :style="buttonEdgeProps.style" />
            </template>
          </VueFlow>
        </div>
      </div>

      <!-- Sidebar for Add/Delete Buttons and Node Form -->
      <div class="col-12 col-lg-3 d-flex flex-column ">
        <div class="title mx-3 px-2 mt-2">
          <h3 class="text-secondary">Node Operations</h3>
        </div>
        <div class="toolbar p-3 border">
          <div class="d-flex flex-lg-column align-items-start">
            <button @click="addNode" class="btn btn-primary w-lg-100 mb-lg-1">Add</button>
            <button @click="deleteNode" :disabled="isButtonDisabled"
              class="btn btn-danger w-lg-100 mb-lg-1">Delete</button>
            <hr class="">
          </div>
        </div>
      </div>

      <!-- Bootstrap Modal for Small Screens -->
      <div class="modal fade" id="nodeModal" tabindex="-1" aria-labelledby="nodeModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="nodeModalLabel">Edit Node</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <NodeForm v-if="selectedNode"  @closeModel="saveChanges"/>
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

  // Open the Bootstrap modal after node selection
  const modal = new bootstrap.Modal(document.getElementById('nodeModal'));
  modal.show();
};

const nodeDragEvent = ({ node }) => {
  updateNodePosition(node.id, node.position);
};

const onConnect = (params) => {
  connectNodes(params);
};

const onNodesChange = (changes) => {
  const selected = changes.find(change => change.type === 'select');
  if (!(selected == undefined) && (selected.selected == false)) {
    deselectNode();
  }
};

const saveChanges = () => {
  // Logic to save node form changes
  const modal = bootstrap.Modal.getInstance(document.getElementById('nodeModal'));
  modal.hide();
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
  /* height: 100%; */
}

.vue-flow__node {
  background: transparent !important;
}

.row {
  height: 100vh;
  /* Full viewport height */
  overflow-y: hidden;
}

.h-72 {
  height: 72% !important;
}

.draw-area,
.toolbar {
  overflow: hidden;
  /* Prevent scrolling */
}

@media (max-width: 992px) {
  .toolbar {
    margin-bottom: 20px;
    padding-bottom: 20px;
  }
}
</style>
<style scoped>
.flow-container {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  /* height: 100%; */
}

button {
  margin-left: 10px;
}

.modal-dialog {
  max-width: 600px;
}

@media (max-width: 992px) {
  .modal-dialog {
    width: 90%;
  }
}
@media (max-width: 992px) { /* Bootstrap's small breakpoint */
    .draw-box {
      height: 72vh !important;
    }
  }
</style>
