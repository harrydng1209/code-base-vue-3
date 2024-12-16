import Error from '@/layouts/Error.vue';

export default {
  component: Error,
  meta: {
    requiresAuth: false,
    roles: [],
    title: 'Forbidden'
  },
  path: constants.routePages.FORBIDDEN
};
