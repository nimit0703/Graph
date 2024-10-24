<template>
  <Sidebar /> <!-- Sidebar component, responsive -->
  <div class="content-wrapper border">
    <FlowComponent /> <!-- Your FlowComponent, next to sidebar -->
  </div>
</template>

<script setup>
import Sidebar from '@/components/global/Sidebar.vue';
import FlowComponent from './FlowComponent.vue';
document.documentElement.setAttribute('data-bs-theme', 'dark');

</script>

<style>
body {
  /* background: #1a1a1a !important; */
}

/* Ensure the content takes the full width except for the sidebar on large screens */
.content-wrapper {
  overflow-y: hidden;
  overflow-y: hidden;
}

@media (min-width: 992px) {
  .content-wrapper {
    margin-left: 0px; /* Adjust based on sidebar width */
    margin-top: 0px; /* Remove top margin for desktop */
    overflow-y: hidden;
  }
}
</style>
