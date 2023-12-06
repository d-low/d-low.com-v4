<script setup>
import { useRoute } from 'vue-router';
import { useContentStore } from '@/stores/content';

const route = useRoute();
const store = useContentStore();

const { path } = route;
const postListingLinks = store.getPostListingLinks(path);
</script>

<template>
  <ul>
    <li
      v-for="postListingLink in postListingLinks"
      :key="postListingLink.href"
    >
      <article>
        <h3>{{ postListingLink.name }}</h3>
        <h4>{{ postListingLink.date }}</h4>
      </article>
    </li>
  </ul>
</template>