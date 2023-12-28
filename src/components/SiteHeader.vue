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
</style>
