import DefaultLayout from '@/layouts/DefaultLayout.vue';
import BasePage from '@/pages/BasePage.vue';

const baseRoute = {
  path: constants.routePages.BASE_PAGE,
  component: DefaultLayout,
  meta: {
    title: 'Base',
    requiresAuth: false
  },
  children: [
    {
      path: constants.routePages.BASE_PAGE,
      component: BasePage
    }
  ]
};

export default baseRoute;
