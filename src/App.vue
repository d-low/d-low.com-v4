<script setup>
import { RouterView, useRoute } from 'vue-router';
import {
  computed,
  ref,
  useCssModule,
  watch,
} from 'vue';
import SiteFooter from '@/components/SiteFooter.vue';
import SiteNavigation from '@/components/SiteNavigation.vue';

const $styles = useCssModule();
const path = ref(null);
const route = useRoute();

path.value = route.path;

watch(() => route.path, () => { path.value = route.path; });

const isHomePage = computed(() => path.value === '/');

const containerClass = computed(() => [
  'tw-pb-8',
  isHomePage.value ? 'background-color-off-white' : 'background-color-gray',
  $styles.container,
]);
</script>

<template>
  <div :class="containerClass">
    <SiteNavigation v-if="!isHomePage" />
    <main>
      <RouterView :key="path" />
    </main>
    <SiteFooter />
  </div>
</template>

<style module>
.container {
  min-height: 100vh;
}
</style>
