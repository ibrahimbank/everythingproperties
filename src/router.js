import { createRouter, createWebHistory } from "vue-router";
import HomeComponent from "../src/components/HomeComponent.vue";
import ResultComponent from "../src/components/ResultComponent.vue";

const routes = [
  { name: "Home", component: HomeComponent, path: "/" },
  { name: "Result", component: ResultComponent, path: "/result" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
