import Vue from "vue";
import VueRouter from "vue-router";
import Auth from "../views/Auth.vue";
import Chat from "../views/Chat.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "login",
  },
  {
    path: "/login",
    name: "login",
    component: Auth,
  },
  {
    path: "/chat",
    name: "chat",
    component: Chat,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
