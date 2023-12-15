<script setup>
import { RouterView, useRoute } from 'vue-router';
import { computed, ref, watch } from 'vue';
import SiteNavigation from '@/components/SiteNavigation.vue';

const path = ref(null);
const route = useRoute();

path.value = route.path;

watch(() => route.path, () => { path.value = route.path; });

const isHomePage = computed(() => path.value === '/');
</script>

<template>
  <SiteNavigation v-if="!isHomePage" />
  <!-- <SiteHeader /> -->
  <main>
    <RouterView :key="path" />
  </main>
</template>
