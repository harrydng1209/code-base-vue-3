import type { ERole } from '@/models/enums/auth.enum';

import useAuthStore from '@/stores/auth.store';
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router';

const { AUTH, FORBIDDEN } = constants.routePages;

type TModules = Record<string, { default: RouteRecordRaw }>;

const routes: Array<RouteRecordRaw> = [];
const modules: TModules = import.meta.glob('@/routes/*.ts', {
  eager: true,
});

Object.keys(modules).forEach((key) => {
  routes.push(modules[key].default);
});

const vueRouterPlugin = {
  install(app: App) {
    const router = createRouter({
      history: createWebHistory(),
      routes,
    });

    router.beforeEach(async (to, _from, next) => {
      const authStore = useAuthStore();

      const title = String(to.meta.title) || 'Code Base Vue 3';
      document.title = title;

      if (to.matched.some((item) => item.meta.requiresAuth)) {
        await authStore.initialize();

        if (!authStore.getAuthenticated) {
          next({ path: AUTH.LOGIN });
          return;
        }

        const requiresRoles = to.meta.roles as ERole[];
        const userRole = authStore.getUserRole;
        const hasRequiredRole = requiresRoles?.some(
          (role) => role === userRole,
        );

        if (requiresRoles.length && !hasRequiredRole) {
          next({ path: FORBIDDEN });
          return;
        }
      }

      next();
    });

    app.use(router);
  },
};

export default vueRouterPlugin;
