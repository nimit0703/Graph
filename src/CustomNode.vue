<template>
    <div class="custom-node">
      <div class="node-label">{{ data.label }}</div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    data: Object,
  });
  </script>
  
  <style scoped>
  .custom-node {
    border: 2px solid #555;
    border-radius: 50%; /* Circular shape */
    background-color: #fff;
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .custom-node .node-label {
    font-size: 14px;
    color: #333;
  }
  
  /* Node connection points */
  .custom-node::after {
    content: '';
    width: 10px;
    height: 10px;
    background-color: #ff6347; /* Tomato color for connection points */
    border-radius: 50%;
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
  }
  
  .custom-node::before {
    content: '';
    width: 10px;
    height: 10px;
    background-color: #ff6347;
    border-radius: 50%;
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
  }
  </style>
  