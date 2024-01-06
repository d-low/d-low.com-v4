<script setup>
import { RouterLink } from 'vue-router';
import { useCssModule } from 'vue';
import CardContainer from '@/components/CardContainer.vue';
import ImageLazyFade from '@/components/ImageLazyFade.vue';

const props = defineProps({
  isHomeView: {
    type: Boolean,
    default: false,
  },
  links: {
    type: Array,
    required: true,
  },
});

const $styles = useCssModule();

const listClass = [
  'tw-grid tw-grid-rows-1 tw-grid-cols-1 tw-justify-items-center',
  'tw-w-full',
  props.isHomeView
    ? ' md:tw-grid-rows-2 md:tw-grid-cols-2 lg:tw-grid-cols-3'
    : '',
  props.isHomeView
    ? 'md:tw-gap-x-4 lg:tw-gap-x-8 tw-gap-y-3 md:tw-gap-y-6'
    : 'tw-gap-y-6 md:tw-gap-y-10 lg:tw-gap-y-14',
];

const listItemClass = [
  'tw-block tw-w-full tw-aspect-4/3',
  props.isHomeView ? '' : $styles.listItem,
];

const linkNameClass = [
  'tw-block',
  props.isHomeView
    ? 'tw-pt-3 tw-pb-1 lg:tw-pb-0'
    : 'tw-pt-5 tw-pb-1',
  props.isHomeView
    ? 'tw-text-xl md:tw-text-2xl lg:tw-text-xl'
    : 'tw-text-2xl md:tw-text-3xl lg:tw-text-4xl',
  'tw-font-normal tw-text-center',
  'link-color font-passion-one-regular',
];
</script>

<template>
  <ul :class="listClass">
    <li
      v-for="link in links"
      :key="link.href"
      :class="listItemClass"
    >
      <CardContainer class="tw-aspect-4/3">
        <RouterLink :to="link.href">
          <ImageLazyFade
            class="tw-w-full tw-object-contain tw-aspect-4/3"
            :src="link.image"
          />
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
