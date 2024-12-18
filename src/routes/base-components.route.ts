import BaseComponents from '@/components/pages/BaseComponents.vue';
import Default from '@/layouts/Default.vue';
import Error from '@/layouts/Error.vue';

const isDevelopment = import.meta.env.VITE_NODE_ENV === constants.shared.NODE_ENV.DEVELOPMENT;

export default {
  children: [
    {
      component: BaseComponents,
      path: constants.routePages.BASE_COMPONENTS
    }
  ],
  component: isDevelopment ? Default : Error,
  meta: {
    requiresAuth: false,
    roles: [],
    title: 'Base Components'
  },
  path: constants.routePages.BASE_COMPONENTS
};
