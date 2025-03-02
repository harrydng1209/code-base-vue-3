<script setup lang="ts">
import type { TOptions } from '@/models/types/shared.type';

interface IProps {
  options: TOptions[];
}

const props = withDefaults(defineProps<IProps>(), {
  options: () => [],
});

const slots: Slots = useSlots();
</script>

<template>
  <ElCheckboxGroup v-bind="$attrs">
    <ElCheckbox
      v-for="(item, index) in props.options"
      :key="item.key || index"
      :label="item.label"
      :value="item.value"
      :class="{ 'no-slot': !slots.default }"
    />
  </ElCheckboxGroup>
</template>
