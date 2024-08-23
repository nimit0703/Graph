import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFlowStore = defineStore('flowStore', () => {
  const rainbowColors = ['#FF7F00', '#0000FF', '#4B0082', '#8B00FF'];

  const nodes = ref([
    {
      id: '1',
      type: 'custom', // Use a custom node type
      position: { x: 250, y: 0 },
      data: { label: 'Node 1' },
    },
  ]);

  const edges = ref([]);

  const selectedNode = ref(null); // Track the selected node
  const isButtonDisabled = ref(true); // Initially, buttons are disabled

  // Method to handle node selection
  const selectNode = (nodeId) => {
    selectedNode.value = nodeId;
    isButtonDisabled.value = false;
  };

  // Method to add a node
  const addNode = () => {
    if (selectedNode.value) {
      const parentNode = nodes.value.find(node => node.id === selectedNode.value);

      // Calculate the new node ID
      const newNodeId = (nodes.value.length + 1).toString();

      // Find the sibling nodes
      const siblingNodes = nodes.value.filter(node =>
        edges.value.some(edge => edge.source === selectedNode.value && edge.target === node.id)
      );

      // Calculate new node's position based on the sibling count
      const xOffset = 200; // Horizontal spacing between nodes
      const yOffset = 150; // Vertical spacing (if needed)

      const newNodePosition = {
        x: parentNode.position.x + siblingNodes.length * xOffset,
        y: parentNode.position.y + yOffset,
      };

      // Create the new node
      const newNode = {
        id: newNodeId,
        type: 'custom', // Use custom node type
        position: newNodePosition,
        data: { label: `Node ${newNodeId}` },
      };

      // Add the new node to the list
      nodes.value = [...nodes.value, newNode];

      // Calculate the color for the new edge
      const edgeColor = rainbowColors[edges.value.length % rainbowColors.length];

      // Add an edge connecting the new node to the selected node
      edges.value = [
        ...edges.value,
        {
          id: `e${selectedNode.value}-${newNodeId}`,
          source: selectedNode.value,
          target: newNodeId,
          style: { stroke: edgeColor, strokeWidth: 3 }, // Apply the color to the edge
        },
      ];
    }
  };

  // Recursive function to find and delete child nodes
  const deleteChildNodes = (nodeId) => {
    // Find all edges where the source is the node to be deleted
    const childEdges = edges.value.filter(edge => edge.source === nodeId);

    childEdges.forEach(edge => {
      const childNodeId = edge.target;

      // Recursively delete the child node and its children
      deleteChildNodes(childNodeId);

      // Delete the child node itself
      nodes.value = nodes.value.filter(node => node.id !== childNodeId);
    });

    // Remove edges associated with the node
    edges.value = edges.value.filter(edge => edge.source !== nodeId && edge.target !== nodeId);
  };

  // Method to delete a node along with all its children
  const deleteNode = () => {
    if (selectedNode.value) {
      deleteChildNodes(selectedNode.value);

      // Remove the selected node
      nodes.value = nodes.value.filter(node => node.id !== selectedNode.value);

      selectedNode.value = null;
      isButtonDisabled.value = true; // Disable buttons again
    }
  };

  const updateNodePosition = (nodeId, newPosition) => {
    const nodeIndex = nodes.value.findIndex(node => node.id === nodeId);
    if (nodeIndex !== -1) {
      nodes.value[nodeIndex].position = newPosition;
    }
  }

  return {
    nodes,
    edges,
    selectedNode,
    isButtonDisabled,
    selectNode,
    addNode,
    deleteNode,
    updateNodePosition
  };
});
