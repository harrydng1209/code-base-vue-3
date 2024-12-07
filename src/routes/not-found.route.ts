import ErrorLayout from '@/layouts/ErrorLayout.vue';

const notFoundRoute = {
  path: '/:pathMatch(.*)*',
  component: ErrorLayout,
  meta: {
    title: 'Page Not Found',
    requiresAuth: false
  }
};

export default notFoundRoute;
