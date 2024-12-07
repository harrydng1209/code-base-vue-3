import GuestLayout from '@/layouts/GuestLayout.vue';

const homeRoute = {
  path: constants.routePages.HOME,
  component: GuestLayout,
  meta: {
    title: 'Home',
    requiresAuth: false
  }
};

export default homeRoute;
