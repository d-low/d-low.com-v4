<script setup>
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
</script>

<template>
  <div
    v-show="visible"
  >
    <button
      @click="$emit('hideImageSlider')"
    >
      X
    </button>
    <ul>
      <li
        v-for="(image, index) in images"
        :key="index"
      >
        <ImageLazyFade
          :src="image"
        />
      </li>
    </ul>
  </div>
</template>
