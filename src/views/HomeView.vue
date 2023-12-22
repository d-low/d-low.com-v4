<script setup>
import { useContentStore } from '@/stores/content';
import TileNavigation from '@/components/TileNavigation.vue';

const store = useContentStore();
const links = store.getLinks({ path: '/', includeMostRecent: true });

const navigationClass = 'tw-mx-auto tw-w-11/12 md:tw-w-9/12 lg:tw-w-3/4';
</script>

<template>
  <section class="tw-flex tw-justify-center">
    <TileNavigation
      :class="navigationClass"
      :is-home-view="true"
      :links="links"
    />
  </section>
</template>
