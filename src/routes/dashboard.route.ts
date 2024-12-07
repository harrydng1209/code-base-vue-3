import { ERole } from '@/models/enums/shared.enum';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

const dashboardRoute = {
  path: constants.routePages.DASHBOARD,
  component: DefaultLayout,
  meta: {
    title: 'Dashboard',
    requiresAuth: false,
    roles: [ERole.Employee, ERole.Admin, ERole.Manager]
  }
};

export default dashboardRoute;
