<script setup>
import { RouterLink, useRoute } from 'vue-router';
import { useContentStore } from '@/stores/content';

const route = useRoute();
const store = useContentStore();

const { path } = route;
const links = store.getLinks({ descending: true, path });
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