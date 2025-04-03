import { HOME } from '@/constants/route-pages.const';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { ERole } from '@/models/enums/auth.enum';
import Home from '@/pages/Home.vue';

export default {
  children: [
    {
      component: Home,
      path: '',
    },
  ],
  component: DefaultLayout,
  meta: {
    requiresAuth: true,
    roles: [ERole.Admin, ERole.Moderator, ERole.SuperAdmin, ERole.User],
    title: 'Home',
  },
  path: HOME,
};
