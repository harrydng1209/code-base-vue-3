import GuestLayout from '@/layouts/GuestLayout.vue';

const homeRoute = {
  path: constants.routePages.HOME_PAGE,
  component: GuestLayout,
  meta: {
    title: 'Home',
    requiresAuth: false
  }
};

export default homeRoute;
