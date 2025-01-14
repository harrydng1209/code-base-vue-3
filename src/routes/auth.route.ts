import Login from '@/components/modules/auth/Login.vue';
import GuestLayout from '@/layouts/GuestLayout.vue';

export default {
  children: [
    {
      component: Login,
      path: constants.routePages.AUTH.LOGIN,
    },
  ],
  component: GuestLayout,
  meta: {
    requiresAuth: false,
    roles: [],
    title: 'Authentication',
  },
  path: constants.routePages.AUTH.ROOT,
};
