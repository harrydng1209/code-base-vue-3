import Error from '@/layouts/Error.vue';

export default {
  path: '/:pathMatch(.*)*',
  component: Error,
  meta: {
    title: 'Page Not Found',
    requiresAuth: false,
    roles: []
  }
};
