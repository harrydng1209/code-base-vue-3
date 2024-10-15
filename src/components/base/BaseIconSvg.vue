<script setup lang="ts">
import useTheme from '@/composables/use-theme';
import { defineProps, shallowRef, watch } from 'vue';
import type { Component } from 'vue';

type TIcons = Record<string, () => Promise<{ default: Component }>>;

interface IProps {
  path: string;
}

const props = defineProps<IProps>();

const { isDark } = useTheme();

const icons = import.meta.glob('../../assets/icons/**/*.vue') as TIcons;
const iconComponent = shallowRef<Component | null>(null);

watch(
  () => props.path,
  async (newPath) => {
    const importPath = `../../assets/icons/${newPath}.vue`;

    if (!icons[importPath]) return (iconComponent.value = null);

    const component = await icons[importPath]();
    iconComponent.value = component.default as Component;
  },
  { immediate: true }
);
</script>

<template>
  <component
    :is="iconComponent"
    :fill="isDark ? constants.shared.COLORS.WHITE : constants.shared.COLORS.BLACK"
    class="tw-cursor-pointer tw-outline-none"
    v-bind="$attrs"
  />
</template>
