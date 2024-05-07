import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Dashboard",
      meta: {
        title: "Dashboard",
        requiresAuth: true
      },
      component: () => import("../views/Dashboard.vue"),
      children: [
        {
          path: "/",
          component: () => import("../views/WaitStaff.vue"),
        },
        {
          path: "/payment",
          name: 'payment',
          component: () => import("../views/Payment.vue"),
        },
        {
          path: "/kitchenstaff",
          name: 'kitchenstaff',
          component: () => import("../views/KitchenStaff.vue"),
        },
        {
          path: "/addorder",
          name: 'addorder',
          component: () => import("../views/AddOrder.vue"),
        },
        {
          path: "/tablestatus",
          name: 'tablestatus',
          component: () => import("../views/UpdateTableStatus.vue"),
        },
        {
          path: "/info",
          component: () => import("../views/InfoStaff.vue"),
        },
      ],
    },
    // {
    //   path: "/waitstaff",
    //   name: "Trang nhan vien phuc vu",
    //   meta: {
    //     title: "Dashboard",
    //   },
    //   component: () => import("../views/WaitStaff.vue"),
    // },
    // {
    //   path: "/kitchenstaff",
    //   name: "Trang nhan vien bep",
    //   meta: {
    //     title: "Dashboard",
    //   },
    //   component: () => import("../views/KitchenStaff.vue"),
    // },
    // {
    //   path: "/addorder",
    //   name: "addorder",
    //   meta: {
    //     title: "Trang them don hang",
    //   },
    //   component: () => import("../views/AddOrder.vue"),
    // },
    {
      path: "/login",
      name: "login",
      meta: {
        title: "Đăng nhập",
      },
      component: () => import("../views/Login.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Kiểm tra trạng thái đăng nhập ở đây
    const isAuthenticated = localStorage.getItem('token') ;
    if (!isAuthenticated) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
