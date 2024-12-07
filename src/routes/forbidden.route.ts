import ErrorLayout from '@/layouts/ErrorLayout.vue';

const forbiddenRoute = {
  path: constants.routePages.FORBIDDEN,
  component: ErrorLayout,
  meta: {
    title: 'Forbidden',
    requiresAuth: false
  }
};

export default forbiddenRoute;
