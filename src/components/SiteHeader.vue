<script setup>
import { useCssModule } from 'vue';

const props = defineProps({
  isHomeView: {
    type: Boolean,
    default: false,
  },
});
const $styles = useCssModule();

const containerClass = [
  'tw-relative',
  props.isHomeView ? 'tw-h-screen' : 'tw-h-48',
  'tw-bg-cover tw-bg-no-repeat',
  'color-header-gray',
  $styles.container,
];

const headingClass = [
  props.isHomeView ? 'tw-absolute tw-t-0 md:tw-fixed' : null,
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

const scrollToNextSection = () => {
  // TODO: Emit an event to inform the parent component to scroll down to the next section.
};
</script>

<template>
  <header :class="containerClass">
    <h1 :class="headingClass">
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
.container {
  background-image:
    url('@/assets/images/wendy-descending-saddle-between-watrous-and-woods.jpg');
  background-position: 50% 0;
}

@media (min-width: 768px) {
  .container {
    background-image:
      url('@/assets/images/wendy-descending-saddle-between-watrous-and-woods-large.jpg');
  }
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
