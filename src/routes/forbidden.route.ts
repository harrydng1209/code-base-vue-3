import ErrorLayout from '@/layouts/ErrorLayout.vue';

const forbiddenRoute = {
  path: constants.routePages.FORBIDDEN_PAGE,
  component: ErrorLayout,
  meta: {
    title: 'Forbidden',
    requiresAuth: false
  }
};

export default forbiddenRoute;
