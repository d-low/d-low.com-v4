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
    default() { return []; },
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
  'tw-snap-mandatory tw-snap-x',
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
  $style.list,
];

const listItemClass = [
  'tw-w-screen',
  'tw-shrink-0',
  'tw-snap-start',
  $style.listItem,
];

const imageClass = [
  'tw-h-full tw-mx-auto',
  $style.image,
];

const handleImageLoaded = (index) => {
  // eslint-disable-next-line no-console
  console.log(`ImageSlider.handleImageLoaded(): Image ${index} loaded!`);
};
</script>

<template>
  <transition
    :enter-active-class="$style.visibleEnterActive"
    :enter-from-class="$style.visibleEnterFrom"
    :leave-active-class="$style.visibleLeaveActive"
    :leave-to-class="$style.visibleLeaveTo"
  >
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
            @image-loaded="handleImageLoaded(index)"
          />
        </li>
      </ul>
    </div>
  </transition>
</template>

<style module>
.container {
  background-color: rgba(0 0 0 / 75%);

  --transition-duration: 0.5s;
  --transition-duration-half: 0.25s;
}

.listItem {
  height: 80vh;
  margin-left: 10vh;
  margin-right: 10vh;;
}

.image {
  aspect-ratio: 4 / 3;
}

.visible-enter-active.container {
  transition: opacity var(--transition-duration) ease;
}

.visible-leave-active.container {
  transition: opacity var(--transition-duration) ease var(--transition-duration-half);
}

.visible-enter-active .list {
  transition: transform var(--transition-duration-half) ease var(--transition-duration);
}

.visible-leave-active .list {
  transition: transform var(--transition-duration-half) ease;
}

.visible-enter-from.container,
.visible-leave-to.container {
  opacity: 0;
}

.visible-enter-from .list,
.visible-leave-to .list {
  opacity: 1;
  transform: translateY(-100%);
}
</style>
