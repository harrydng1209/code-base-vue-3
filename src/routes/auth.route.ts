import Login from '@/components/modules/auth/Login.vue';
import Guest from '@/layouts/Guest.vue';

export default {
  children: [
    {
      component: Login,
      path: constants.routePages.AUTH.LOGIN
    }
  ],
  component: Guest,
  meta: {
    requiresAuth: false,
    roles: [],
    title: 'Authentication'
  },
  path: constants.routePages.AUTH.ROOT
};
