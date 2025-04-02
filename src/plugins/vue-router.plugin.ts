import type { ERole } from '@/models/enums/auth.enum';

import { AUTH_PAGES, FORBIDDEN } from '@/constants/route-pages.const';
import { useAuthStore } from '@/stores/auth.store';
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router';

type TModules = Record<string, { default: RouteRecordRaw }>;

const routes: Array<RouteRecordRaw> = [];
const modules: TModules = import.meta.glob('@/routes/*.ts', {
  eager: true,
});

Object.keys(modules).forEach((key) => {
  routes.push(modules[key].default);
});

export const vueRouterPlugin = {
  install(app: App) {
    const router = createRouter({
      history: createWebHistory(),
      routes,
    });

    router.beforeEach(async (to, _from, next) => {
      const authStore = useAuthStore();

      if (to.meta.title) document.title = String(to.meta.title);

      if (to.matched.some((item) => item.meta.requiresAuth)) {
        await authStore.initialize();

        if (!authStore.getAuthenticated) {
          next({ path: AUTH_PAGES.LOGIN });
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
