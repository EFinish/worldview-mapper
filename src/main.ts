import Vue from 'vue';
import { BootstrapVue } from 'bootstrap-vue';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.min.css';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created: () => {
    store.dispatch('initStoreForTesting');
  },
  render: (h) => h(App),
}).$mount('#app');
