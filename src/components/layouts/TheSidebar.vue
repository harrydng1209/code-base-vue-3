<script setup lang="ts">
const { LAYOUTS, SHARED } = constants.iconPaths;
const { BLACK, WHITE } = constants.shared.COLORS;
const { AUTH, BASE_COMPONENTS, HOME } = constants.routePages;

const { t } = useI18n();
const { isDark } = useTheme();
const route = useRoute();
</script>

<template>
  <div class="the-sidebar">
    <div class="the-sidebar__logo">
      <RouterLink :to="HOME">
        <BaseIconSvg :path="SHARED.LOGO" />
      </RouterLink>
    </div>

    <ElMenu :defaultActive="route.path" :collapse="false" :router="true">
      <ElMenuItem :index="AUTH.LOGIN">
        <ElIcon>
          <BaseIconSvg :path="LAYOUTS.DASHBOARD" :fill="isDark ? WHITE : BLACK" />
        </ElIcon>
        <template #title>{{ t('shared.navigator.login') }}</template>
      </ElMenuItem>

      <ElMenuItem :index="BASE_COMPONENTS">
        <ElIcon>
          <BaseIconSvg :path="LAYOUTS.FOLDER_SHARED" :fill="isDark ? WHITE : BLACK" />
        </ElIcon>
        <template #title>{{ t('shared.navigator.base-components') }}</template>
      </ElMenuItem>
    </ElMenu>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/layouts/the-sidebar.scss';
</style>
