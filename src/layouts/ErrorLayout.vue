<script setup lang="ts">
const { HOME } = constants.routePages;

const router = useRouter();
</script>

<template>
  <div class="container">
    <h6>This screen does not exist</h6>
    <BaseButton @click="router.push(HOME)">Go to home screen</BaseButton>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  @include flexbox-style(16px, center, center, column);
}
</style>
