import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import MiQuiniela from "./views/MiQuiniela.vue";

const routes = [
  {
    path: "/",
    name: 'Home',
    component: Home
  },
  {
    path: "/mi-quiniela",
    name: 'MiQuiniela',
    component: MiQuiniela
  }
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router;