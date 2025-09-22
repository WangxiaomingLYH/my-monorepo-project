import { createRouter, createWebHistory } from "vue-router";
import { generateAutoRoutes } from "./auto-router"

const router = createRouter({
  history: createWebHistory(),
  routes: generateAutoRoutes()
});
// console.log(generateAutoRoutes(), "@")
export default router;
