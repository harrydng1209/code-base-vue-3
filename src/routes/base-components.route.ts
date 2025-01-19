import BaseComponents from '@/components/modules/BaseComponents.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import ErrorLayout from '@/layouts/ErrorLayout.vue';
import { ERole } from '@/models/enums/auth.enum';

const { DEVELOP } = constants.shared.NODE_ENVS;
const { BASE_COMPONENTS } = constants.routePages;
const isDevelopment = import.meta.env.VITE_NODE_ENV === DEVELOP;

export default {
  children: [
    {
      component: BaseComponents,
      path: '',
    },
  ],
  component: isDevelopment ? DefaultLayout : ErrorLayout,
  meta: {
    requiresAuth: true,
    roles: [ERole.Admin, ERole.Moderator, ERole.SuperAdmin, ERole.User],
    title: 'Base Components',
  },
  path: BASE_COMPONENTS,
};
