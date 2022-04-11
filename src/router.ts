import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import MiQuiniela from "./views/MiQuiniela.vue";
import Admin from "./views/Admin.vue";
import Leaderboard from "./views/Leaderboard.vue";
import Results from "./views/Results.vue";

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
  }, 
  {
    path: "/marcador",
    name: 'Marcador',
    component: Leaderboard
  }, 
  {
    path: "/quinielas",
    name: 'Quinielas',
    component: Results
  }
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router;