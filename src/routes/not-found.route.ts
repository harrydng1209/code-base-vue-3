import Error from '@/layouts/Error.vue';

export default {
  component: Error,
  meta: {
    requiresAuth: false,
    roles: [],
    title: 'Page Not Found'
  },
  path: '/:pathMatch(.*)*'
};
