<script setup>
/**
 * Fade in images using native lazy loading. This component was inspired by the following article:
 * https://medium.com/@tanay7/lazy-loading-images-basics-to-advanced-b69fa5568053
 */
import { ref, onMounted } from 'vue';

defineProps({
  src: {
    type: String,
    required: true,
  },
});

const img = ref(null);
const imgOpacity = ref('tw-opacity-0');

const handleLoaded = () => {
  imgOpacity.value = '';
  img.value.removeEventListener('load', handleLoaded);
};

onMounted(() => {
  if (img.value.complete) {
    handleLoaded();
  } else {
    img.value.addEventListener('load', handleLoaded);
  }
});
</script>

<template>
  <img
    ref="img"
    loading="lazy"
    :class="['tw-transition-opacity tw-duration-500', imgOpacity]"
    :src="src"
  >
</template>
