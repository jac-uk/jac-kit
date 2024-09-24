import { createApp } from 'vue';

import App from './App.vue';
import * as filters from './filters/filters';

// Use mitt for events
import mitt from 'mitt';

/**
 * Mitt is used to replace the event bus, which is no longer supported in Vue3.
 * Ultimately this should be replaced by another pattern.
 * See: https://v3-migration.vuejs.org/breaking-changes/events-api.html
 */
const emitter = mitt();


// Root instance
const vueApp = createApp(App);

// Bind filters and event bus before mounting
vueApp.config.globalProperties.$filters = filters;
vueApp.config.globalProperties.emitter = emitter;

// Root component
vueApp.mount('#app');
