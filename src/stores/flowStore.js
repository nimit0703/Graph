import { defineStore } from "pinia";
import { ref } from "vue";

export const useFlowStore = defineStore("flowStore", () => {
  const nodes = ref([
    {
      id: "1",
      type: "custom",
      position: { x: 250, y: 0 },
      data: { label: "Node 1" },
    },
  ]);

  const edges = ref([]);
  const selectedNode = ref(null);
  const selectedEdges = ref(null)
  const isButtonDisabled = ref(true);

  const selectNode = (nodeId) => {
    selectedNode.value = nodeId;
    isButtonDisabled.value = false;
  };

  const deselectNode = () =>{
    selectedNode.value = null;
    isButtonDisabled.value = true;
  }

  const addNode = () => {
    const newNodeId = (nodes.value.length + 1).toString();
    const newNode = {
      id: newNodeId,
      type: "custom",
      position: { x: 200 * nodes.value.length, y: 0 },
      data: { label: `Node ${newNodeId}` },
    };
    nodes.value = [...nodes.value, newNode];
  };

  const updateNode = (id,data) =>{
    // find node from nodes and update it's data
    const node = nodes.value.find((node) => node.id === id);
    if (node) node.data = data;
  }

  const deleteNode = () => {
    if (selectedNode.value) {
      nodes.value = nodes.value.filter(
        (node) => node.id !== selectedNode.value.id
      );
      edges.value = edges.value.filter(
        (edge) =>
          edge.source !== selectedNode.value.id &&
          edge.target !== selectedNode.value.id
      );
      selectedNode.value = null;
      isButtonDisabled.value = true;
    }
  };

  const updateNodePosition = (nodeId, newPosition) => {
    const node = nodes.value.find((node) => node.id === nodeId);
    if (node) node.position = newPosition;
  };

  const connectNodes = (params) => {
    edges.value = [
      ...edges.value,
      {
        ...params,
        id: `e${params.source}-${params.target}`,
        type: "button",
        data: { text: "custom edge" },
      },
    ];
  };

  return {
    nodes,
    edges,
    selectedNode,
    isButtonDisabled,
    selectNode,
    addNode,
    deleteNode,
    updateNodePosition,
    connectNodes,
    deselectNode,
    updateNode
  };
});
