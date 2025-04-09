import { CODEBASE } from '@/constants/route-pages.const';
import { NODE_ENVS } from '@/constants/shared.const';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import ErrorLayout from '@/layouts/ErrorLayout.vue';
import { ERole } from '@/models/enums/auth.enum';
import Codebase from '@/pages/Codebase.vue';

const isDevelop = import.meta.env.VITE_NODE_ENV === NODE_ENVS.DEVELOP;

export default {
  children: [
    {
      component: Codebase,
      path: '',
    },
  ],
  component: isDevelop ? DefaultLayout : ErrorLayout,
  meta: {
    requiresAuth: true,
    roles: [ERole.Admin, ERole.Moderator, ERole.SuperAdmin, ERole.User],
    title: 'Codebase',
  },
  path: CODEBASE,
};
