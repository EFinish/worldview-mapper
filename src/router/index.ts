import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Builder from '@/views/Builder.vue';
import Map from '@/views/Map.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/builder',
    name: 'Builder',
    component: Builder,
  },
  {
    path: '/map',
    name: 'Map',
    component: Map,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
