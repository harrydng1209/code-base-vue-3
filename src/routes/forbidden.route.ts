import ErrorLayout from '@/layouts/ErrorLayout.vue';

const { FORBIDDEN } = constants.routePages;

export default {
  component: ErrorLayout,
  meta: {
    requiresAuth: false,
    roles: [],
    title: 'Forbidden',
  },
  path: FORBIDDEN,
};
