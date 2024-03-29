<script setup>
import { ref, onMounted, useCssModule } from 'vue';
import { useDebounceFn, useEventListener, useThrottleFn } from '@vueuse/core';
import backgroundImageSm from '@/assets/images/wendy-descending-saddle-between-watrous-and-woods.jpg';
import backgroundImageLg from '@/assets/images/wendy-descending-saddle-between-watrous-and-woods-large.jpg';

const props = defineProps({
  isHomeView: {
    type: Boolean,
    default: false,
  },
});

const container = ref(null);
const heading = ref(null);
const headingHeight = ref(0);
const headingStyle = ref({ display: 'block', opacity: 1 });

const $styles = useCssModule();

const backgroundImageClass = [
  props.isHomeView ? 'tw-fixed' : 'tw-absolute',
  'tw-z-0',
  'tw-w-full tw-h-full',
  'tw-transition-opacity tw-duration-500',
  'tw-object-cover',
].join(' ');

const haveHeroImagesLoaded = () => window?.sessionStorage?.getItem('heroImagesLoaded') !== null;
const backgroundImageOpacity = ref(haveHeroImagesLoaded() ? 'tw-opacity-100' : 'tw-opacity-0');

const backgroundImgSrcSet = `${backgroundImageSm} 700w, ${backgroundImageLg} 1900w`;

const containerClass = [
  'tw-relative',
  props.isHomeView ? 'tw-h-screen' : 'tw-h-48',
  'color-header-gray',
  props.isHomeView ? $styles.containerHomeView : null,
];

const headingClass = [
  'tw-absolute tw-t-0',
  props.isHomeView ? 'md:tw-fixed' : null,
  'tw-w-full',
  'tw-text-center',
  props.isHomeView ? 'md:tw-text-right' : null,
  'tw-lowercase',
  props.isHomeView ? $styles.headingHomeView : null,
];

const titleClass = [
  'tw-block',
  'tw-pt-5 tw-pb-2.5',
  'tw-text-6xl md:tw-text-7xl lg:tw-text-8xl',
  'font-passion-one-regular heading-text-shadow',
];

const subtitleClass = [
  'tw-text-base md:tw-text-lg lg:tw-text-xl',
  'font-passion-one-regular',
];

const downArrowClass = [
  'tw-absolute tw-block',
  'tw-bottom-20 md:tw-bottom-4 tw-left-1/2',
  'tw--translate-x-1/2',
  'tw-w-40 md:tw-w-48 lg:tw-w-64 tw-h-12',
  'after:tw-absolute after:tw-w-1/2 after:tw-h-2 after:tw-rounded after:tw-bottom-0',
  'before:tw-absolute before:tw-w-1/2 before:tw-h-2 before:tw-rounded before:tw-bottom-0',
  'tw-cursor-pointer',
  'color-header-gray',
  $styles.downArrow,
];

const fadeInHeroImage = () => {
  let heroImageLoadedCount = 0;

  const handleImgLoaded = () => {
    if (heroImageLoadedCount === 2 || haveHeroImagesLoaded()) {
      window?.sessionStorage?.setItem('heroImagesLoaded', true);
      backgroundImageOpacity.value = 'tw-opacity-100';
      return true;
    }

    return false;
  };

  if (haveHeroImagesLoaded()) {
    return;
  }

  [backgroundImageSm, backgroundImageLg].forEach((backgroundImage) => {
    const img = new Image();
    img.onload = () => {
      heroImageLoadedCount += 1;
      handleImgLoaded();
    };
    img.crossOrigin = true;
    img.src = backgroundImage;
  });
};

const scrollToNextSection = () => {
  const { height } = container.value.getBoundingClientRect();
  window.scrollTo({ behavior: 'smooth', top: height });
};

/**
 * Set the heading height when the component is mounted and also when the page is resized. This is
 * done for efficiency so that the heading height isn't calculated every 16ms when setting the
 * heading opacity as the page is scrolled.
 */
const setHeadingHeight = () => {
  headingHeight.value = parseInt(window.getComputedStyle(heading.value).height, 10);
};

/**
 * @todo When using Vue's reactivity, the setHeadingOpacity() method is called at most once every
 * 16ms as the window scrolls by useThrottleFn(). This works well enough, but should
 * requestAnimationFrame() be used to ensure smoother animations? How would that work with Vue's
 * built in reactivity? And is it really necessary?
 * @see https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
 */
const setHeadingOpacity = () => {
  const opacity = 1 - (window.scrollY / (window.innerHeight - headingHeight.value));

  // Hide the logo when no longer visible so it doesn't block elements now visible above the fold.
  if (opacity < 0) {
    headingStyle.value.display = 'none';
    headingStyle.value.opacity = 0;
  } else {
    headingStyle.value.display = 'block';
    headingStyle.value.opacity = opacity;
  }
};

const handleOnMounted = () => {
  setHeadingHeight();
  fadeInHeroImage();
};

if (props.isHomeView) {
  onMounted(handleOnMounted);
  useEventListener(window, 'resize', useDebounceFn(setHeadingHeight));
  useEventListener(window, 'scroll', useThrottleFn(setHeadingOpacity, 16));
} else {
  onMounted(fadeInHeroImage);
}
</script>

<template>
  <header
    ref="container"
    :class="containerClass"
  >
    <img
      :class="[
        backgroundImageClass,
        backgroundImageOpacity,
      ]"
      sizes="100vw"
      :srcset="backgroundImgSrcSet"
      :src="backgroundImageLg"
    >
    <h1
      ref="heading"
      :class="headingClass"
      :style="headingStyle"
    >
      <span :class="titleClass">
        d-low.com
      </span>
      <small :class="subtitleClass">
        Words and photos by Mike DiLorenzo
      </small>
    </h1>
    <button
      v-if="isHomeView"
      :class="downArrowClass"
      @click="scrollToNextSection"
    />
  </header>
</template>

<style module>
/**
 * Use clip-path on the parent element and position fixed on the image to mimic the native
 * background-attachment styles for an <img> element.
 * @see https://stackoverflow.com/questions/33550450/how-to-use-css-background-attachment-in-img-tag
 */
.containerHomeView {
  clip-path: inset(0);
}

.headingHomeView {
  right: 0;
}

@media (min-width: 768px) {
  .headingHomeView {
    right: 5%;
  }
}

.downArrow::before,
.downArrow::after {
  background-color: var(--header-gray);
  box-shadow: 2px 3px 3px rgba(0 0 0 / 30%);
}

/* Left half of down arrow */
.downArrow::before {
  right: calc(50% - 0.125rem);
  transform: rotate(20deg);
  transform-origin: 100% 50%;
}

/* Right half of down arrow */
.downArrow::after {
  left: calc(50% - 0.125rem);
  transform: rotate(-20deg);
  transform-origin: 0% 50%;
}

</style>
