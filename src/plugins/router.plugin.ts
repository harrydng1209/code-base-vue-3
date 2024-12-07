import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import useAuthStore from '@/stores/auth.store';
import type { ERole } from '@/models/enums/shared.enum';
import type { App } from 'vue';

const routerPlugin = {
  install(app: App) {
    const routes: Array<RouteRecordRaw> = [];
    const modules: Record<string, { default: RouteRecordRaw }> = import.meta.glob('@/routes/*.ts', {
      eager: true
    });

    Object.keys(modules).forEach((key) => {
      routes.push(modules[key].default);
    });

    const router = createRouter({
      history: createWebHistory(),
      routes
    });

    router.beforeEach(async (to, _from, next) => {
      const authStore = useAuthStore();

      if (to.matched.some((item) => item.meta.requiresAuth)) {
        await authStore.initialize();

        if (!authStore.getAuthenticated) {
          next({ path: constants.routePages.HOME });
          return;
        }

        const requiresRoles = to.meta.roles as ERole[];
        const userRole = authStore.getUserInfo?.role;
        const hasRequiredRole = requiresRoles?.some((role) => role === userRole);

        if (requiresRoles.length && !hasRequiredRole) {
          next({ path: constants.routePages.FORBIDDEN });
          return;
        }
      }

      next();
    });

    app.use(router);
  }
};

export default routerPlugin;
