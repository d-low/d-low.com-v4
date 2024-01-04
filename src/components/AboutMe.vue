<script setup>
// TODO
// 1. Adjust margin/padding on mobile layout to match content above
// 2. Update copy?
// 3. Consistent image names (separate commit)

import { useCssModule } from 'vue';
import ImageLazyFade from '@/components/ImageLazyFade.vue';
import OnTheSummit from '@/assets/images/2021-09-01-02-OnTheSummit.jpg';
import TopOfMiddleburySkiBowl from '@/assets/images/2023-11-11-01-TopOfMiddleburySkiBowl.jpg';

const $style = useCssModule();
const containerClass = 'md:tw-flex md:tw-flex-wrap md:tw-justify-center';
const firstColumnClass = 'md:tw-w-1/2 xl:tw-w-1/3 tw-mb-4';
const secondColumnClass = 'md:tw-w-1/2 xl:tw-w-1/3 tw-mb-4 md:tw-pl-4 xl:tw-px-8';
const thirdColumnClass = 'md:tw-w-auto xl:tw-w-1/3 tw-my-4 xl:tw-mt-0';

const imageContainerClass = [
  'tw-block tw-p-4',
  'tw-border tw-shadow-md',
  'border-color-gray background-color-off-white',
  $style.imageContainer,
];

const textClass = 'tw-mb-4 tw-text-sm tw-leading-7 first-letter:tw-text-5xl';
</script>

<template>
  <article :class="containerClass">
    <figure :class="[firstColumnClass, imageContainerClass]">
      <ImageLazyFade
        alt="On the summit of Mt. Bierstadt"
        :class="$style.image"
        :src="OnTheSummit"
      />
    </figure>
    <div :class="secondColumnClass">
      <p :class="textClass">
        Welcome to the website of Mike DiLorenzo, husband, father, hiker, mountain biker, cross
        country skier, mountain enthusiast, craft beer drinker, front end web developer and
        overall nice guy.
      </p>
      <p :class="textClass">
        This website chronicles some of the more interesting things I've done: hiking, traveling,
        and landscaping. The site will be updated when I do cool things, so don't be discouraged if
        it isn't updated for a few months. Eventually coolness will return.
      </p>
    </div>
    <figure :class="[thirdColumnClass, imageContainerClass]">
      <ImageLazyFade
        alt="Top of Middlebury Ski Bowl"
        :class="['md:tw-max-h-96', $style.image]"
        :src="TopOfMiddleburySkiBowl"
      />
    </figure>
  </article>
</template>

<style module>
.imageContainer {
  min-height: 18rem;
}

.image {
  aspect-ratio: 4 / 3;
}
</style>
