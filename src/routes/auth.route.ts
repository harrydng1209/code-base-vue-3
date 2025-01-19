import Login from '@/components/modules/auth/Login.vue';
import Register from '@/components/modules/auth/Register.vue';
import GuestLayout from '@/layouts/GuestLayout.vue';

const { AUTH } = constants.routePages;

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
