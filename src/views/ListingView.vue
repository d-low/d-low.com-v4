<script setup>
import { useRoute } from 'vue-router';
import { useContentStore } from '@/stores/content';
import PageTitle from '@/components/PageTitle.vue';
import SiteHeader from '@/components/SiteHeader.vue';
import TileNavigation from '@/components/TileNavigation.vue';

const route = useRoute();
const store = useContentStore();

const { path } = route;
const links = store.getLinks({ descending: true, path });

const containerClass = [
  'tw-flex tw-justify-center',
  'tw-px-2 md:tw-px-6 lg:tw-px-8 tw-pb-8',
];
</script>

<template>
  <SiteHeader />
  <PageTitle />
  <section :class="containerClass">
    <TileNavigation
      :links="links"
    />
  </section>
</template>
