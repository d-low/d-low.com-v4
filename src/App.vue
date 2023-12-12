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
  <RouterView
    :key="path"
    class="tw-w-full tw-pt-4 tw-px-2 lg:tw-px-4 tw-pb-8"
  />
</template>
