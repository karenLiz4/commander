import { createRouter, createWebHistory } from "vue-router";
import Index from "./pages/Index.vue";
import Admin from "./pages/Admin.vue";

const routes = [
  { path: "/", component: Index },
  { path: "/admin", component: Admin },
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router;