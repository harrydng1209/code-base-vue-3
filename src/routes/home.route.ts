import Home from '@/components/modules/Home.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { ERole } from '@/models/enums/auth.enum';

const { HOME } = constants.routePages;

export default {
  children: [
    {
      component: Home,
      path: '',
    },
  ],
  component: DefaultLayout,
  meta: {
    requiresAuth: false,
    roles: [ERole.Admin, ERole.Moderator, ERole.SuperAdmin, ERole.User],
    title: 'Home',
  },
  path: HOME,
};
