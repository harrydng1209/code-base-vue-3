import { AUTH_PAGES } from '@/constants/route-pages.const';
import GuestLayout from '@/layouts/GuestLayout.vue';
import Login from '@/pages/auth/Login.vue';
import Register from '@/pages/auth/Register.vue';

export default {
  children: [
    {
      component: Login,
      path: AUTH_PAGES.LOGIN,
    },
    {
      component: Register,
      path: AUTH_PAGES.REGISTER,
    },
  ],
  component: GuestLayout,
  meta: {
    requiresAuth: false,
    roles: [],
    title: 'Authentication',
  },
  path: AUTH_PAGES.ROOT,
};
