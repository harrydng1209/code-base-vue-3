import type { IPermission } from '@/models/interfaces/auth.interface';
import type { App } from 'vue';

import { ERole } from '@/models/enums/auth.enum';
import useAuthStore from '@/stores/auth.store';
import { AbilityBuilder, createMongoAbility, PureAbility } from '@casl/ability';
import { abilitiesPlugin } from '@casl/vue';

const rolePermissions: Record<ERole, IPermission[]> = {
  [ERole.Admin]: [{ action: 'manage', subject: 'Article' }],
  [ERole.Guest]: [{ action: 'read', subject: 'Article' }],
  [ERole.Moderator]: [{ action: 'moderate', subject: 'Comment' }],
  [ERole.SuperAdmin]: [{ action: 'manage', subject: 'all' }],
  [ERole.User]: [{ action: 'create', subject: 'Article' }]
};

const defineAbilitiesFor = (role: ERole): PureAbility => {
  const { build, can } = new AbilityBuilder(createMongoAbility);
  rolePermissions[role]?.forEach(({ action, subject }) => can(action, subject));
  return build();
};

const caslVuePlugin = {
  install(app: App) {
    const authStore = useAuthStore();
    const ability = defineAbilitiesFor(ERole.Guest);

    app.use(abilitiesPlugin, ability);

    authStore.$subscribe(() => {
      const role = authStore.getUserRole || ERole.Guest;
      ability.update(defineAbilitiesFor(role).rules);
    });
  }
};

export default caslVuePlugin;
