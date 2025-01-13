import BaseComponents from '@/components/modules/BaseComponents.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import ErrorLayout from '@/layouts/ErrorLayout.vue';

const { NODE_ENVS } = constants.shared;
const isDevelopment = import.meta.env.VITE_NODE_ENV === NODE_ENVS.DEVELOP;

export default {
  children: [
    {
      component: BaseComponents,
      path: ''
    }
  ],
  component: isDevelopment ? DefaultLayout : ErrorLayout,
  meta: {
    requiresAuth: false,
    roles: [],
    title: 'Base Components'
  },
  path: constants.routePages.BASE_COMPONENTS
};
