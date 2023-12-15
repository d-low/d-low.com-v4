<script setup>
import { RouterLink } from 'vue-router';
import { useContentStore } from '@/stores/content';
import { useCssModule } from 'vue'

const $styles = useCssModule();
const store = useContentStore();
const links = [
  { name: 'Home', href: '/', image: '' },
  ...store.getLinks({ path: '/' }),
];

const containerClass = [
  'tw-sticky tw-top-0 tw-left-0 tw-z-10',
  'tw-flex tw-justify-center',
  'tw-w-full tw-h-20',
  'tw-border-y border-color-header-gray',
  'tw-text-center',
  $styles.container,
];

const listClass = [
  'tw-flex tw-justify-center',
  'tw-w-4/5 tw-h-full tw-px-2',
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
  'tw-text-sm hover:tw-underline',
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
          {{ link.name  }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style module>
.container {
  background-image: linear-gradient(to bottom, rgba(153, 153, 153, 0.75), rgba(255, 255, 255, 0.75));
}

.listItem {
  min-width: 7rem;
}

.link {
  line-height: 5rem;;
}
</style>