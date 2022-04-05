import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import MiQuiniela from "./views/MiQuiniela.vue";
import Admin from "./views/Admin.vue";

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
  },
  {
    path: "/admin",
    name: 'Admin',
    component: Admin
  }
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router;