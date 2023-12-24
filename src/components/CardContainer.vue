<script setup>
const containerClass = [
  'tw-block tw-w-full',
  'tw-p-1 md:tw-p-2 lg:tw-p-3',
  'tw-border tw-shadow-md',
  'background-color-off-white border-color-gray',
];
</script>

<template>
  <div :class="containerClass">
    <slot />
  </div>
</template>
