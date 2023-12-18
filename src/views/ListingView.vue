<script setup>
// TODO:
// - Refactor styles/components for reuse in ..?
// - Lazy load images (SEE: https://medium.com/@tanay7/lazy-loading-images-basics-to-advanced-b69fa5568053)
import { RouterLink, useRoute } from 'vue-router';
import { useContentStore } from '@/stores/content';
import { useCssModule } from 'vue'
import CardContainer from '@/components/CardContainer.vue';
import PageTitle from '@/components/PageTitle.vue';

const route = useRoute();
const store = useContentStore();
const $styles = useCssModule();

const { path } = route;
const links = store.getLinks({ descending: true, path });

const listItemClass = [
  'tw-block tw-mx-auto tw-mb-6 md:tw-mb-10 lg:tw-mb-14',
  $styles.listItem,
];

const linkNameClass = [
  'tw-block tw-py-5',
  'tw-text-2xl md:tw-text-3xl lg:tw-text-4xl tw-font-normal tw-text-center',
  'link-color font-passion-one-regular',
];
</script>

<template>
  <PageTitle />
  <ul class="tw-w-full tw-px-2 md:tw-px-6 lg:tw-px-8 tw-pb-8">
    <li
      v-for="link in links"
      :key="link.href"
      :class="listItemClass"
    >
      <CardContainer>
        <RouterLink :to="link.href">
          <img
            class="tw-w-full tw-object-contain tw-aspect-4/3"
            :src="link.image"
          >
          <strong :class="linkNameClass">
            {{ link.name }}
          </strong>
        </RouterLink>
      </CardContainer>
    </li>
  </ul>
</template>

<style module>
.listItem {
  width: 100%;
}

@media (min-width: 1024px) {
  .listItem {
    width: 45rem;
  }
}
</style>