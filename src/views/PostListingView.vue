<script setup>
import { useRoute } from 'vue-router';
import { useContentStore } from '@/stores/content';
import PageTitle from '@/components/PageTitle.vue';
import PostListingLink from '@/components/PostListingLink.vue';
import SiteHeader from '@/components/SiteHeader.vue';

const route = useRoute();
const store = useContentStore();

const { path } = route;
const postListingLinks = store.getPostListingLinks(path);
</script>

<template>
  <SiteHeader />
  <PageTitle />
  <ul class="tw-w-full tw-pt-4 tw-px-2 lg:tw-px-4 tw-pb-8">
    <li
      v-for="(postListingLink, index) in postListingLinks"
      :key="postListingLink.href"
      class="lg:tw-max-w-4xl lg:tw-mx-auto tw-mb-4 lg:tw-mb-20"
    >
      <PostListingLink
        :post-listing-link="postListingLink"
        :reverse-layout="index % 2 === 1"
      />
    </li>
  </ul>
</template>
