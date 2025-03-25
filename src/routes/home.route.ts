import Home from '@/components/modules/Home.vue';
import { HOME } from '@/constants/route-pages.const';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { ERole } from '@/models/enums/auth.enum';

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
