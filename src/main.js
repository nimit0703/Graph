
import './assets/main.css'
import '@vue-flow/controls/dist/style.css'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { customCursorDirective } from './directives/customCursorDirective';


const app = createApp(App);

// Register the custom cursor directive globally
app.directive('customCursor',customCursorDirective);


app.use(createPinia());
app.use(router);

app.mount('#app');
