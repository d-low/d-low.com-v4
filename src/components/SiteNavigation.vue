<script setup>
import { RouterLink } from 'vue-router';
import { useCssModule } from 'vue';
import { useContentStore } from '@/stores/content';

const $styles = useCssModule();
const store = useContentStore();
const links = [
  { name: 'Home', href: '/', image: '' },
  ...store.getLinks({ path: '/' }),
];

const containerClass = [
  'tw-sticky tw-top-0 tw-left-0 tw-z-10',
  'tw-w-full tw-h-20 tw-overflow-scroll hide-scrollbar-on-mobile',
  'tw-border-y border-color-header-gray',
  $styles.container,
];

const listClass = [
  'tw-flex md:tw-justify-center',
  'tw-w-max md:tw-w-full lg:tw-w-4/5 tw-h-full',
  'tw-mx-auto tw-px-2',
];

const listItemClass = [
  'tw-inline-block tw-h-full',
  'tw-flex-grow',
  'tw-border-l last:tw-border-r border-color-gray',
  'tw-transition-colors hover:tw-bg-white',
  $styles.listItem,
];

const linkClass = [
  'tw-inline-block tw-w-full tw-h-full tw-px-4',
  'tw-text-sm hover:tw-underline tw-whitespace-nowrap tw-text-center',
  $styles.link,
];
</script>

<template>
  <nav :class="containerClass">
    <ul :class="listClass">
      <li
        v-for="link in links"
        :key="link.href"
        :class="listItemClass"
      >
        <RouterLink
          :class="linkClass"
          :to="link.href"
        >
          {{ link.name }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style module>
.container {
  background-image: linear-gradient(
    to bottom,
    rgba(153 153 153 / 75%),
    rgba(255 255 255 / 75%)
  );
}

.listItem {
  min-width: 7rem;
}

.link {
  line-height: 5rem;;
}
</style>
