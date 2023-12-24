<script setup>
import { useRoute } from 'vue-router';
import { useContentStore } from '@/stores/content';
import CardContainer from '@/components/CardContainer.vue';

const route = useRoute();
const store = useContentStore();

const { path } = route;
const postListingLinks = store.getPostListingLinks(path);
</script>

<template>
  <ul class="tw-w-full tw-pt-4 tw-px-2 lg:tw-px-4 tw-pb-8">
    <li
      v-for="postListingLink in postListingLinks"
      :key="postListingLink.href"
      class="tw-mb-4 lg:tw-mb-20"
    >
      <CardContainer>
        <h3>{{ postListingLink.name }}</h3>
        <h4>{{ postListingLink.date }}</h4>
      </CardContainer>
    </li>
  </ul>
</template>
