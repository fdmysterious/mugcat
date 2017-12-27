import Vue       from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import { generate_page_title } from "lib/utils";

// Global resources //
import "raw-loader!../index.pug" // Actually triggers reloading the page
import "./style/index.scss"      // Compiles the main stylesheet
// End of section //


Vue.use( VueRouter );
import router from './config/router';

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
