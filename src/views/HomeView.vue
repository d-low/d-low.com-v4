<script setup>
import { RouterLink } from 'vue-router';
import { useContentStore } from '@/stores/content';

const store = useContentStore();
const links = store.getLinks({ path: '/', includeMostRecent: true });
</script>

<template>
  <main>
    <ul>
      <li
        v-for="link in links"
        :key="link.href"
      >
        <RouterLink :to="link.href">
          <img
            :src="link.image"
            width="300"
          >
          <strong style="display: block;">
            {{ link.name }}
          </strong>
        </RouterLink>
      </li>
    </ul>
  </main>
</template>
