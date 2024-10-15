import { ERole } from '@/models/enums/shared.enum';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

const homeRoute = {
  path: constants.routePages.DASHBOARD_PAGE,
  component: DefaultLayout,
  meta: {
    title: 'Dashboard',
    requiresAuth: false,
    roles: [ERole.Employee, ERole.Admin, ERole.Manager]
  }
};

export default homeRoute;
