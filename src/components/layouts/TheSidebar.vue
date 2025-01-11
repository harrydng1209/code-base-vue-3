<script setup lang="ts">
const { t } = useI18n();
const { isDark } = useTheme();
const route = useRoute();
</script>

<template>
  <div class="the-sidebar">
    <div class="the-sidebar__logo">
      <RouterLink :to="constants.routePages.HOME">
        <BaseIconSvg :path="constants.iconPaths.SHARED.LOGO" />
      </RouterLink>
    </div>

    <ElMenu :defaultActive="route.path" :collapse="false" :router="true">
      <ElMenuItem :index="constants.routePages.AUTH.LOGIN">
        <ElIcon>
          <BaseIconSvg
            :path="constants.iconPaths.LAYOUTS.DASHBOARD"
            :fill="isDark ? constants.shared.COLORS.WHITE : constants.shared.COLORS.BLACK"
          />
        </ElIcon>
        <template #title>{{ t('shared.navigator.login') }}</template>
      </ElMenuItem>

      <ElMenuItem :index="constants.routePages.BASE_COMPONENTS">
        <ElIcon>
          <BaseIconSvg
            :path="constants.iconPaths.LAYOUTS.FOLDER_SHARED"
            :fill="isDark ? constants.shared.COLORS.WHITE : constants.shared.COLORS.BLACK"
          />
        </ElIcon>
        <template #title>{{ t('shared.navigator.base-components') }}</template>
      </ElMenuItem>
    </ElMenu>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/layouts/the-sidebar.scss';
</style>
