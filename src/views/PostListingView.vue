<script setup>
import { useRoute } from 'vue-router';
import { useContentStore } from '@/stores/content';
import PageTitle from '@/components/PageTitle.vue';
import PostListingLink from '@/components/PostListingLink.vue';
import SiteHeader from '@/components/SiteHeader.vue';

const route = useRoute();
const store = useContentStore();

const { path } = route;
const postListingLinks = store.getPostListingLinks(path).reverse();

const listItemClass = [
  'lg:tw-max-w-4xl lg:tw-mx-auto',
  'tw-mb-10 md:tw-mb-14 lg:tw-mb-20',
];
</script>

<template>
  <SiteHeader />
  <PageTitle />
  <ul class="tw-w-full tw-pt-4 tw-px-2 lg:tw-px-4 tw-pb-8">
    <li
      v-for="(postListingLink, index) in postListingLinks"
      :key="postListingLink.href"
      :class="listItemClass"
    >
      <PostListingLink
        :hero-image-align-right="index % 2 === 0"
        :post-listing-link="postListingLink"
      />
    </li>
  </ul>
</template>
