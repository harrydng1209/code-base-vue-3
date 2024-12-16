import Default from '@/layouts/Default.vue';
import { ERole } from '@/models/enums/auth.enum';

export default {
  component: Default,
  meta: {
    requiresAuth: false,
    roles: [ERole.Employee, ERole.Admin, ERole.Manager],
    title: 'Home'
  },
  path: constants.routePages.HOME
};
