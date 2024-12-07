import DefaultLayout from '@/layouts/DefaultLayout.vue';
import ErrorLayout from '@/layouts/ErrorLayout.vue';
import BaseComponents from '@/pages/BaseComponents.vue';

const isDevelopment = import.meta.env.VITE_NODE_ENV === constants.shared.NODE_ENV.DEVELOPMENT;

const baseRoute = {
  path: constants.routePages.BASE_COMPONENTS,
  component: isDevelopment ? DefaultLayout : ErrorLayout,
  meta: {
    title: 'Base',
    requiresAuth: false
  },
  children: [
    {
      path: constants.routePages.BASE_COMPONENTS,
      component: BaseComponents
    }
  ]
};

export default baseRoute;
