import Login from '@/components/modules/auth/Login.vue';
import GuestLayout from '@/layouts/GuestLayout.vue';

const { AUTH } = constants.routePages;

export default {
  children: [
    {
      component: Login,
      path: AUTH.LOGIN,
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
