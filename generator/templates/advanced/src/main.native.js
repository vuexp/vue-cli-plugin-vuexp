import Vue from 'nativescript-vue';
import registerComponents from './componentRegisterer';
import router from './router';

import App from './App.vue';

registerComponents(Vue);

// Set the following to `true` to hide the logs created by nativescript-vue
Vue.config.silent = false;
// Set the following to `false` to not colorize the logs created by nativescript-vue
// disabled in template due to typing issue for Typescript projects....NEEDS TO BE FIXED
// Vue.config.debug = true;

new Vue({
  router,
  // TODO removed until fix vuexp-router frame bug
  //render: h => h('frame', [h(App)]),
  render: h => h(App)
}).$start();
