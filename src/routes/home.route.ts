import Home from '@/components/modules/Home.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { ERole } from '@/models/enums/auth.enum';

export default {
  children: [
    {
      component: Home,
      path: ''
    }
  ],
  component: DefaultLayout,
  meta: {
    requiresAuth: false,
    roles: [ERole.Admin, ERole.Guest, ERole.Moderator, ERole.SuperAdmin, ERole.User],
    title: 'Home'
  },
  path: constants.routePages.HOME
};
