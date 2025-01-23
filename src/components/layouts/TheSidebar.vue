<script setup lang="ts">
const { LAYOUTS, SHARED } = constants.iconPaths;
const { AUTH, BASE_COMPONENTS, HOME } = constants.routePages;
const { themeColors } = constants;

const { t } = useI18n();
const { theme } = useTheme();
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
          <BaseIconSvg
            :path="LAYOUTS.DASHBOARD"
            :fill="themeColors[theme].ICON_SVG"
          />
        </ElIcon>
        <template #title>{{ t('shared.navigator.login') }}</template>
      </ElMenuItem>

      <ElMenuItem :index="AUTH.REGISTER">
        <ElIcon>
          <BaseIconSvg
            :path="LAYOUTS.SETTINGS"
            :fill="themeColors[theme].ICON_SVG"
          />
        </ElIcon>
        <template #title>{{ t('shared.navigator.register') }}</template>
      </ElMenuItem>

      <ElMenuItem :index="BASE_COMPONENTS">
        <ElIcon>
          <BaseIconSvg
            :path="LAYOUTS.FOLDER_SHARED"
            :fill="themeColors[theme].ICON_SVG"
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
