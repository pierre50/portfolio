import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/projects",
    name: "projects",
    component: () => import("../views/Projects.vue"),
  },
  {
    path: "/project/:id",
    name: "project",
    component: () => import("../views/Project.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("../views/Contact.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "notfound",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

export default router;
