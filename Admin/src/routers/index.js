import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/signup",
      name: "đăng kí",
      meta: {
        title: "Đăng kí",
      },
      component: () => import("../views/SignUp.vue"),
    },
    {
      path: "/login",
      name: "đăng nhập",
      meta: {
        title: "Đăng nhập",
      },
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/",
      name: "Dashboard",
      meta: {
        title: "Trang quản lý",
        requiresAuth: true
      },
      component: () => import("../views/Dashboard.vue"),
      children: [
        {
          path: "/",
          component: () => import("../views/Home.vue"),
        },
        {
          path: "/admin/table",
          component: () => import("../views/Table.vue"),
        },
        {
          path: "/admin/table/create",
          component: () => import("../views/TableCreate.vue"),
        },
        {
          path: "/admin/table/update/:id",
          component: () => import("../views/TableUpdate.vue"),
        },
        {
          path: "/admin/dish",
          component: () => import("../views/Dish.vue"),
        },
        {
          path: "/admin/dish/create",
          component: () => import("../views/DishCreate.vue"),
        },
        {
          path: "/admin/dish/update/:id",
          component: () => import("../views/DishUpdate.vue"),
        },
        {
          path: "/admin/staff",
          component: () => import("../views/Staff.vue"),
        },
        {
          path: "/admin/staff/create",
          component: () => import("../views/StaffCreate.vue"),
        },
        {
          path: "/admin/staff/update/:id",
          component: () => import("../views/StaffUpdate.vue"),
        },
        {
          path: "/admin/order",
          component: () => import("../views/Order.vue"),
        },
        {
          path: "/admin/order/create",
          component: () => import("../views/OrderCreate.vue"),
        },
        {
          path: "/admin/info",
          component: () => import("../views/InfoStaff.vue"),
        },
        
      ],
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
