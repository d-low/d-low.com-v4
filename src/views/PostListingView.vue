<script setup>
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useContentStore } from '@/stores/content';
import ImageSlider from '@/components/ImageSlider.vue';
import PageTitle from '@/components/PageTitle.vue';
import PostListingLink from '@/components/PostListingLink.vue';
import SiteHeader from '@/components/SiteHeader.vue';

const imageSliderProps = reactive({
  images: null,
  initialImage: 0,
  showImageSlider: false,
});
const route = useRoute();
const store = useContentStore();

const { path } = route;
const postListingLinks = store.getPostListingLinks(path).reverse();

const listClass = 'tw-w-full tw-pt-4 tw-px-2 lg:tw-px-4 tw-pb-8 tw-snap-y';

const listItemClass = [
  'lg:tw-max-w-4xl lg:tw-mx-auto',
  'tw-mb-10 md:tw-mb-14 lg:tw-mb-20',
  'tw-scroll-mt-32',
];

const getPostListingLinkId = (href) => href.split('/').pop();

onMounted(() => window.setTimeout(() => {
  const { hash } = window.location;

  if (hash) {
    const id = hash.replace('#', '');
    const el = document.getElementById(id);

    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }
}, 250));

const handleHideImageSlider = () => {
  imageSliderProps.initialImage = 0;
  imageSliderProps.images = null;
  imageSliderProps.visible = false;
};

const handleShowImageSlider = ({ currentImage, images }) => {
  imageSliderProps.initialImage = currentImage;
  imageSliderProps.images = images.map((image, index) => ({
    caption: `${store.getImageCaption(image)} - ${index + 1} of ${images.length}`,
    href: image,
  }));
  imageSliderProps.visible = true;
};
</script>

<template>
  <SiteHeader />
  <PageTitle />
  <ul :class="listClass">
    <li
      v-for="(postListingLink, index) in postListingLinks"
      :id="getPostListingLinkId(postListingLink.href)"
      :key="postListingLink.href"
      :class="listItemClass"
    >
      <PostListingLink
        :hero-image-align-right="index % 2 === 0"
        :post-listing-link="postListingLink"
        @show-image-slider="handleShowImageSlider"
      />
    </li>
  </ul>
  <ImageSlider
    v-bind="imageSliderProps"
    @hide-image-slider="handleHideImageSlider"
  />
</template>
