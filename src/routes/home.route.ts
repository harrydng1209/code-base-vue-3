import Home from '@/components/pages/Home.vue';
import Default from '@/layouts/Default.vue';
import { ERole } from '@/models/enums/auth.enum';

export default {
  children: [
    {
      component: Home,
      path: constants.routePages.HOME
    }
  ],
  component: Default,
  meta: {
    requiresAuth: false,
    roles: [ERole.Admin, ERole.Guest, ERole.Moderator, ERole.SuperAdmin, ERole.User],
    title: 'Home'
  },
  path: constants.routePages.HOME
};
