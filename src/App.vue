<template>
  <!-- <FlowComponent /> -->
  <div class="bg-light">
    <div class="container">
      <h1 class="display-4 text-center ">Custom Cursor Effects</h1>
      <p>
        We have built a custom cursor effect for a Vue.js application that replaces the browser's default cursor with a
        personalized image-based cursor. This is achieved using a Vue directive and custom CSS. The directive dynamically
        creates a cursor element, which follows the user's mouse movements within a designated area. Instead of relying on
        inline styles, the cursor styling is managed through an external CSS file, keeping the code clean and
        maintainable.
      </p>
      <p>
        The custom cursor is styled using CSS to display an image that follows the mouse position within a specified
        element. It has hover and click effects: on hover, the cursor pulses using a subtle scaling animation, and on
        click, it expands and fades out, creating a smooth visual interaction. The default browser cursor is hidden in the
        defined area by applying `cursor: none;`, making the custom image cursor the primary visual representation. This
        approach provides a sleek, interactive experience, allowing for easier future modifications by simply adjusting
        the CSS and image.
      </p>
    </div>
    <div class="container p-2 d-flex justify-content-between flex-wrap mt-5">
      <div v-customCursor:hero class="border rounded-3 p-2">
        Hover over me! (Pulsing Cursor)
      </div>
      <div v-customCursor:supercat class="border rounded-3 p-2">
        Super cat
      </div>
      <div v-customCursor:pineapple class="border rounded-3 p-2">
        Hover over me! (Pulsing Cursor)
      </div>
  </div>
  </div>
</template>

<script setup>
import FlowComponent from './FlowComponent.vue';
</script>

<style>
  body{
    background: #1a1a1a !important;
  }
</style>