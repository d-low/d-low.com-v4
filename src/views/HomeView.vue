<script setup>
import { useCssModule } from 'vue';
import { useContentStore } from '@/stores/content';
import SiteHeader from '@/components/SiteHeader.vue';
import TileNavigation from '@/components/TileNavigation.vue';

const $styles = useCssModule();
const store = useContentStore();
const links = store.getLinks({ path: '/', includeMostRecent: true });

const navigationContainerClass = [
  'tw-flex tw-justify-center',
  'tw-pt-4 tw-px-2 tw-pb-8 md:tw-pt-8 md:tw-px-4 md:tw-pb-12',
  'tw-bg-cover tw-bg-center tw-bg-no-repeat',
  $styles.navigationContainer,
];
const navigationClass = 'tw-mx-auto tw-w-11/12 md:tw-w-9/12 lg:tw-w-3/4';
</script>

<template>
  <SiteHeader :is-home-view="true" />
  <section :class="navigationContainerClass">
    <TileNavigation
      :class="navigationClass"
      :is-home-view="true"
      :links="links"
    />
  </section>
</template>

<style module>
.navigationContainer {
  background-color: var(--sky-blue);
  background-image: url('@/assets/images/resting-above-treeline.jpg');
}

@media (min-width: 768px) {
  .navigationContainer {
    background-image: url('@/assets/images/resting-above-treeline-lg.jpg');
  }
}
</style>
