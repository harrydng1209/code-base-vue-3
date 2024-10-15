<script setup lang="ts">
import BaseIconSvg from '@/components/base/BaseIconSvg.vue';

const { t } = useI18n();
</script>

<template>
  <div class="sidebar-layout">
    <div class="sidebar-layout__logo">
      <img src="@/assets/images/logo.png" alt="logo" width="84" height="84" />
    </div>

    <ElMenu default-active="1" :collapse="false" :router="true">
      <ElMenuItem :index="constants.routePages.DASHBOARD_PAGE">
        <ElIcon>
          <BaseIconSvg :path="constants.shared.ICON_PATHS.LAYOUTS_DASHBOARD" />
        </ElIcon>
        <template #title>{{ t('shared.dashboard') }}</template>
      </ElMenuItem>

      <ElMenuItem :index="constants.routePages.BASE_PAGE">
        <ElIcon>
          <BaseIconSvg :path="constants.shared.ICON_PATHS.LAYOUTS_FOLDER_SHARED" />
        </ElIcon>
        <template #title>{{ t('navigator.baseComponent') }}</template>
      </ElMenuItem>
    </ElMenu>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/layouts/sidebar-layout.scss';
</style>
