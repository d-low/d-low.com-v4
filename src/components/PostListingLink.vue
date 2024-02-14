<script setup>
/* eslint vue/no-v-html: off */

import {
  computed,
  onMounted,
  ref,
  useCssModule,
} from 'vue';
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

const $emit = defineEmits(['showImageSlider']);

const text = ref('');
const textContainer = ref(null);
const $style = useCssModule();

const heroImageIndex = props.heroImageAlignRight ? 3 : 0;
const heroImage = props.postListingLink.images[heroImageIndex];

const startImageIndex = props.heroImageAlignRight ? 0 : 1;
const endImageIndex = props.heroImageAlignRight ? 3 : 4;
const images = props.postListingLink.images.slice(startImageIndex, endImageIndex);

const canViewAllImages = props.postListingLink.images.length > 4;
const moreImagesCount = `+${props.postListingLink.images.length - 4} more`;

const isExpanded = ref(false);
const buttonText = computed(() => (isExpanded.value ? 'Read Less' : 'Read More'));
const textContainerStyle = computed(() => {
  if (isExpanded.value) {
    const height = parseInt(window.getComputedStyle(textContainer.value.firstChild).height, 10);
    return { maxHeight: `${height + 32}px` };
  }

  return {};
});

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
  'tw-flex tw-relative',
  $style.imageContainer,
];

const heroImageClass = [
  'tw-w-2/3 tw-h-full tw-pb-1',
  props.heroImageAlignRight ? 'tw-order-2 tw-ml-0.5' : 'tw-order-1 tw-mr-0.5',
  'tw-cursor-pointer',
];

const imageListClass = [
  'tw-flex tw-flex-col',
  'tw-w-1/3 tw-h-full',
  props.heroImageAlignRight ? 'tw-order-1 tw-mr-0.5' : 'tw-order-2 tw-ml-0.5',
];

const viewAllImagesButtonClass = [
  'tw-absolute tw-bottom-1.5',
  props.heroImageAlignRight ? 'tw-right-0.5' : 'tw-left-0.5',
  'tw-flex tw-flex-col tw-justify-center tw-items-center',
  'tw-w-1/3 lg:tw-w-1/4 xl:tw-w-1/5',
  'tw-h-1/3 lg:tw-h-1/4 xl:tw-h-1/5',
  'tw-border',
  props.heroImageAlignRight ? $style.viewAllImagesButtonRight : $style.viewAllImagesButtonLeft,
  'tw-cursor-pointer',
  'tw-font-bold tw-text-white',
  $style.viewAllImagesButton,
  'tw-transition-opacity hover:tw-opacity-75',
];

const textContainerClass = computed(() => ([
  'tw-relative',
  'tw-w-11/12 tw-max-h-80',
  'tw-mx-auto tw-mb-4',
  'tw-overflow-hidden',
  'tw-transition-all',
  $style.textContainer,
  isExpanded.value ? $style.textContainerExpanded : null,
]));

const buttonClass = [
  'tw-block tw-mx-auto tw-mb-8',
  'tw-text-lg tw-font-bold tw-underline',
];

onMounted(async () => {
  text.value = await props.postListingLink.getText();
});

const handleButtonClick = () => {
  isExpanded.value = !isExpanded.value;
};

const handleImageClick = (currentImage) => {
  $emit('showImageSlider', {
    currentImage,
    images: props.postListingLink.images,
  });
};
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
        @click="handleImageClick(heroImageIndex)"
      />
      <ul :class="imageListClass">
        <li
          v-for="(image, index) in images"
          :key="image"
          class="tw-h-1/3 tw-pb-1"
        >
          <ImageLazyFade
            class="tw-w-full tw-h-full tw-cursor-pointer"
            :src="image"
            @click="() => handleImageClick(startImageIndex + index)"
          />
        </li>
      </ul>
      <button
        v-if="canViewAllImages"
        :class="viewAllImagesButtonClass"
        @click="() => handleImageClick(0)"
      >
        <strong>View All</strong>
        <small>{{ moreImagesCount }}</small>
      </button>
    </div>
    <div
      ref="textContainer"
      :class="textContainerClass"
      :style="textContainerStyle"
      v-html="text"
    />
    <button
      :class="buttonClass"
      @click="handleButtonClick"
    >
      {{ buttonText }}
    </button>
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

.viewAllImagesButton {
  background: radial-gradient(at top left, rgba(36 41 46 / 15%), rgba(36 41 46 / 85%));
}

.viewAllImagesButtonLeft {
  border-color: var(--black-pearl) var(--baltic-sea) var(--baltic-sea) var(--black-pearl);
}

.viewAllImagesButtonRight {
  border-color: var(--baltic-sea) var(--black-pearl) var(--black-pearl) var(--baltic-sea);
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

.textContainerExpanded ::after {
  display: none;
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
