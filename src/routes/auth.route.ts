import Login from '@/components/modules/auth/Login.vue';
import Register from '@/components/modules/auth/Register.vue';
import { AUTH } from '@/constants/route-pages.const';
import GuestLayout from '@/layouts/GuestLayout.vue';

export default {
  children: [
    {
      component: Login,
      path: AUTH.LOGIN,
    },
    {
      component: Register,
      path: AUTH.REGISTER,
    },
  ],
  component: GuestLayout,
  meta: {
    requiresAuth: false,
    roles: [],
    title: 'Authentication',
  },
  path: AUTH.ROOT,
};
