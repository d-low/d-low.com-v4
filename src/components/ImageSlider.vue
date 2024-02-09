<script setup>
import { useCssModule } from 'vue';
import ImageLazyFade from '@/components/ImageLazyFade.vue';

defineProps({
  currentImage: {
    type: Number,
    default: 0,
  },
  images: {
    type: Array,
    default: null,
  },
  visible: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['hideImageSlider']);

const $style = useCssModule();

const containerClass = [
  'tw-fixed tw-z-10 tw-inset-0',
  'tw-w-screen tw-h-screen',
  'tw-overflow-x-auto tw-overflow-y-hidden tw-overscroll-contain',
  $style.container,
];

const closeButtonClass = [
  'tw-fixed',
  'tw-top-2 tw-right-2 lg:tw-top-4 lg:tw-right-4',
  'tw-w-12 tw-h-12',
  'tw-border-2 tw-border-white tw-rounded-full',
];

const closeButtonTextClass = [
  'tw-inline-block',
  'tw-text-white',
  'tw-font-bold tw-text-3xl',
  'tw-rotate-45',
];

const listClass = [
  'tw-flex tw-items-center',
  'tw-h-full',
];

const listItemClass = [
  'tw-w-screen',
  'tw-shrink-0',
  $style.listItem,
];

const imageClass = [
  'tw-h-full tw-mx-auto',
  $style.image,
];
</script>

<template>
  <div
    v-show="visible"
    :class="containerClass"
  >
    <button
      :class="closeButtonClass"
      @click="$emit('hideImageSlider')"
    >
      <span :class="closeButtonTextClass">+</span>
    </button>
    <ul :class="listClass">
      <li
        v-for="(image, index) in images"
        :key="index"
        :class="listItemClass"
      >
        <ImageLazyFade
          :class="imageClass"
          :src="image"
        />
      </li>
    </ul>
  </div>
</template>

<style module>
.container {
  background-color: rgba(0 0 0 / 75%);
}

.listItem {
  height: 80vh;
  margin-left: 10vh;
  margin-right: 10vh;;
}

.image {
  aspect-ratio: 4 / 3;
}
</style>
