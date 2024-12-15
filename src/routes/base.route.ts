import Default from '@/layouts/Default.vue';
import Error from '@/layouts/Error.vue';
import BaseComponents from '@/components/pages/BaseComponents.vue';

const isDevelopment = import.meta.env.VITE_NODE_ENV === constants.shared.NODE_ENV.DEVELOPMENT;

export default {
  path: constants.routePages.BASE_COMPONENTS,
  component: isDevelopment ? Default : Error,
  meta: {
    title: 'Base Components',
    requiresAuth: false,
    roles: []
  },
  children: [
    {
      path: constants.routePages.BASE_COMPONENTS,
      component: BaseComponents
    }
  ]
};
