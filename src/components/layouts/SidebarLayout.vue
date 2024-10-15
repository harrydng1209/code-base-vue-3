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

      <ElMenuItem index="2">
        <ElIcon>
          <BaseIconSvg :path="constants.shared.ICON_PATHS.LAYOUTS_DASHBOARD" />
        </ElIcon>
        <template #title>Navigator Two</template>
      </ElMenuItem>

      <ElMenuItem index="3">
        <ElIcon>
          <BaseIconSvg :path="constants.shared.ICON_PATHS.LAYOUTS_DASHBOARD" />
        </ElIcon>
        <template #title>Navigator Three</template>
      </ElMenuItem>

      <ElMenuItem index="4">
        <ElIcon>
          <BaseIconSvg :path="constants.shared.ICON_PATHS.LAYOUTS_DASHBOARD" />
        </ElIcon>
        <template #title>Navigator Four</template>
      </ElMenuItem>
    </ElMenu>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/layouts/sidebar-layout.scss';
</style>
