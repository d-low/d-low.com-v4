<script setup>
/**
 * @todo
 * - Image preview layout (2/3 width hero with stacked images to left/right in remaining 1/3)
 * - View All +X more link
 * - Display cropped text
 * - Read More/Read Less link to show/hide cropped text
 * - Image viewer (Use FancyBox? https://fancyapps.com/resources/integration/#vue)
 */
import CardContainer from '@/components/CardContainer.vue';
import ImageLazyFade from '@/components/ImageLazyFade.vue';

const props = defineProps({
  postListingLink: {
    type: Object,
    required: true,
  },
  reverseLayout: {
    type: Boolean,
    default: false,
  },
});

const images = props.postListingLink.images.slice(0, 4);

const titleClass = [
  'tw-text-center',
  'tw-text-3xl lg:tw-text-4xl',
  'font-passion-one-regular',
];

const dateClass = [
  'tw-mb-5 lg:tw-mb-6',
  'tw-text-center',
  'tw-text-2xl lg:tw-text-3xl',
  'font-passion-one-regular',
];
</script>

<template>
  <CardContainer>
    <header>
      <h3 :class="titleClass">
        {{ postListingLink.name }}
      </h3>
      <h4 :class="dateClass">
        {{ postListingLink.date }}
      </h4>
    </header>
    <div>
      <ul>
        <li
          v-for="image in images"
          :key="image"
        >
          <a href="javascript:void(0);">
            <ImageLazyFade :src="image" />
          </a>
        </li>
      </ul>
    </div>
  </CardContainer>
</template>
