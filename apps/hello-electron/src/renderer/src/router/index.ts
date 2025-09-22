import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./routes";
import { beforeEach, affterEach } from "./permission";

const AppRouter = createRouter({
    history: createWebHashHistory(),
    routes
})

AppRouter.beforeEach(beforeEach)
AppRouter.afterEach(affterEach)

export default AppRouter