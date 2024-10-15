<script setup lang="ts">
import SidebarLayout from '@/components/layouts/SidebarLayout.vue';
import TopbarLayout from '@/components/layouts/TopbarLayout.vue';
import { useWindowScroll } from '@vueuse/core';

const { y } = useWindowScroll();

const headerStyle = computed(() => ({
  marginTop: y.value > 50 ? '-20px' : '0',
  transition: 'margin-top 0.3s ease'
}));
</script>

<template>
  <ElContainer class="default-layout">
    <ElAside class="default-layout__sidebar">
      <SidebarLayout />
    </ElAside>

    <ElContainer class="default-layout__main">
      <ElHeader class="default-layout__main-header" :style="headerStyle">
        <TopbarLayout />
      </ElHeader>

      <ElMain class="default-layout__main-view">
        <RouterView />
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>

<style scoped lang="scss">
@import '@/assets/styles/layouts/default-layout.scss';
</style>
