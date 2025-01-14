import ErrorLayout from '@/layouts/ErrorLayout.vue';

export default {
  component: ErrorLayout,
  meta: {
    requiresAuth: false,
    roles: [],
    title: 'Forbidden',
  },
  path: constants.routePages.FORBIDDEN,
};
