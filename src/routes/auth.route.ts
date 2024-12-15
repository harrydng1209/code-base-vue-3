import Guest from '@/layouts/Guest.vue';
import Login from '@/components/pages/auth/Login.vue';

export default {
  path: constants.routePages.AUTH.ROOT,
  component: Guest,
  meta: {
    title: 'Authentication',
    requiresAuth: false,
    roles: []
  },
  children: [
    {
      path: constants.routePages.AUTH.LOGIN,
      component: Login
    }
  ]
};
