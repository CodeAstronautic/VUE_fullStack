import Vue from "vue";
import VueRouter from "vue-router";
import Post from "../views/Post.vue";
import Home from "../views/Home.vue";
import CreatePost from "../views/CreatePost.vue";
import Profile from "../views/Profile.vue";
import Edit from "../views/edit.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: Post,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/create",
    name: "create",
    component: CreatePost,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/post/:id",
    name: "edit",
    component: Edit,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/",
    name: "login",
    component: () => import("../views/login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/register.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") == null) {
      next({
        path: "/",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
