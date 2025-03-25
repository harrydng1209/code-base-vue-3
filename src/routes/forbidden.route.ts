import { FORBIDDEN } from '@/constants/route-pages.const';
import ErrorLayout from '@/layouts/ErrorLayout.vue';

export default {
  component: ErrorLayout,
  meta: {
    requiresAuth: false,
    roles: [],
    title: 'Forbidden',
  },
  path: FORBIDDEN,
};
