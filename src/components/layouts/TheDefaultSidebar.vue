<script setup lang="ts">
const { t } = useI18n();
const { isDark } = useTheme();
</script>

<template>
  <div class="the-default-sidebar">
    <div class="the-default-sidebar__logo">
      <RouterLink :to="constants.routePages.HOME">
        <BaseIconSvg :path="constants.shared.ICON_PATHS.SHARED_LOGO" />
      </RouterLink>
    </div>

    <ElMenu default-active="1" :collapse="false" :router="true">
      <ElMenuItem :index="constants.routePages.DASHBOARD">
        <ElIcon>
          <BaseIconSvg
            :path="constants.shared.ICON_PATHS.LAYOUTS_DASHBOARD"
            :fill="isDark ? constants.shared.COLORS.WHITE : constants.shared.COLORS.BLACK"
          />
        </ElIcon>
        <template #title>{{ t('shared.dashboard') }}</template>
      </ElMenuItem>

      <ElMenuItem :index="constants.routePages.BASE_COMPONENTS">
        <ElIcon>
          <BaseIconSvg
            :path="constants.shared.ICON_PATHS.LAYOUTS_FOLDER_SHARED"
            :fill="isDark ? constants.shared.COLORS.WHITE : constants.shared.COLORS.BLACK"
          />
        </ElIcon>
        <template #title>{{ t('navigator.baseComponents') }}</template>
      </ElMenuItem>
    </ElMenu>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/layouts/the-default-sidebar.scss';
</style>
