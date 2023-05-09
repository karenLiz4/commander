import { createRouter, createWebHistory } from "vue-router";
import Index from "./pages/Index.vue";
import Admin from "./pages/Admin.vue";
import Login from "./pages/Login.vue";

const routes = [
  { path: "/", component: Index },
  { path: "/admin", component: Admin },
  { path: "/login", component: Login }
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router;