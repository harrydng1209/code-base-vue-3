import Error from '@/layouts/Error.vue';

export default {
  path: constants.routePages.FORBIDDEN,
  component: Error,
  meta: {
    title: 'Forbidden',
    requiresAuth: false,
    roles: []
  }
};
