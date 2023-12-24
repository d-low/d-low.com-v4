<script setup>
import { useRoute } from 'vue-router';
import { useContentStore } from '@/stores/content';

const route = useRoute();
const store = useContentStore();

const [page] = route.path.split('/').slice(-1);
const pageTitle = store.prettifyTitle(page);
const pageTitleClass = [
  'tw-my-8',
  'tw-text-center tw-text-4xl md:tw-text-5xl lg:tw-text-6xl',
  'font-passion-one-regular',
];
</script>

<template>
  <h2 :class="pageTitleClass">
    {{ pageTitle }}
  </h2>
</template>
