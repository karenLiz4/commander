import { createRouter, createWebHistory } from "vue-router";
import Index from "./pages/Index.vue";
import Admin from "./pages/Admin.vue";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import Comanda from "./pages/Comanda.vue";
// import GenerarComanda from "./pages/GenerarComanda.vue";

const routes = [
  { path: "/", component: Index },
  { path: "/admin", component: Admin },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/comanda", component: Comanda }
  // { path: "/generarComanda", component: GenerarComanda }
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router;