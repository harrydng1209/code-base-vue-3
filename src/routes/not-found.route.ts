import ErrorLayout from '@/layouts/ErrorLayout.vue';

export default {
  component: ErrorLayout,
  meta: {
    requiresAuth: false,
    roles: [],
    title: 'Page Not Found',
  },
  path: '/:pathMatch(.*)*',
};
