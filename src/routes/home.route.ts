import { ERole } from '@/models/enums/auth.enum';
import Default from '@/layouts/Default.vue';

export default {
  path: constants.routePages.HOME,
  component: Default,
  meta: {
    title: 'Home',
    requiresAuth: false,
    roles: [ERole.Employee, ERole.Admin, ERole.Manager]
  }
};
