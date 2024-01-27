<script setup>
/* eslint vue/no-v-html: off */

/**
 * @todo
 * - View All +X more link
 * - Read More/Read Less link to show/hide cropped text
 * - Image viewer (Use FancyBox? https://fancyapps.com/resources/integration/#vue)
 */
import { useCssModule, onMounted, ref } from 'vue';
import CardContainer from '@/components/CardContainer.vue';
import ImageLazyFade from '@/components/ImageLazyFade.vue';

const props = defineProps({
  heroImageAlignRight: {
    type: Boolean,
    default: false,
  },
  postListingLink: {
    type: Object,
    required: true,
  },
});

const text = ref('');
const $style = useCssModule();

const heroImage = props.postListingLink.images[0];
const images = props.postListingLink.images.slice(1, 4);

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

const imageContainerClass = [
  'tw-flex',
  $style.imageContainer,
];

const heroImageClass = [
  'tw-w-2/3 tw-h-full tw-pb-1',
  props.heroImageAlignRight ? 'tw-order-2 tw-ml-0.5' : 'tw-order-1 tw-mr-0.5',
];

const imageListClass = [
  'tw-flex tw-flex-col',
  'tw-w-1/3 tw-h-full',
  props.heroImageAlignRight ? 'tw-order-1 tw-mr-0.5' : 'tw-order-2 tw-ml-0.5',
];

const textContainer = [
  'tw-relative',
  'tw-w-11/12 tw-max-h-80',
  'tw-mx-auto tw-mb-12',
  'tw-overflow-hidden',
  $style.textContainer,
];

onMounted(async () => {
  text.value = await props.postListingLink.getText();
});
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
    <div :class="imageContainerClass">
      <ImageLazyFade
        :src="heroImage"
        :class="heroImageClass"
      />
      <ul :class="imageListClass">
        <li
          v-for="image in images"
          :key="image"
          class="tw-h-1/3 tw-pb-1"
        >
          <ImageLazyFade
            class="tw-w-full tw-h-full"
            :src="image"
          />
        </li>
      </ul>
    </div>
    <div
      :class="textContainer"
      v-html="text"
    />
  </CardContainer>
</template>

<style module>
.imageContainer {
  height: 50vw;
}

@media (min-width: 1024px) {
  .imageContainer {
    max-height: 25rem;
  }
}

@media (min-width: 1280px) {
  .imageContainer {
    max-height: 31.25rem;
  }
}

.textContainer ::after {
  background: linear-gradient(to bottom, rgba(249 249 249 / 0%), rgba(249 249 249 / 100%) 100%);
  bottom: 0;
  content: "";
  height: 3rem;
  position: absolute;
  right: 0;
  text-align: right;
  width: 100%;
}

.textContainer :global(.eventContainer) p > b:first-child {
  color: var(--link-color);
  display: block;
  font-family: PassionOne-Regular, Helvetica, sans-serif;
  font-size: 1.75rem;
  line-height: 2rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  text-align: center;
}

.textContainer p > b:first-child + br {
  display: none;
}

.textContainer p {
  line-height: 1.5rem;
  margin-bottom: 1rem;
}
</style>
