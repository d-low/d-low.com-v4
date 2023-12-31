<script setup>
// TODO
// 1. Adjust margin/padding on mobile layout to match content above
// 2. Desktop styles
// 3. Update copy?
// 4. Consistent image names (separate commit)

const imageContainerClass = [
  'tw-p-4 tw-mb-4',
  'tw-border tw-shadow-md',
  'border-color-gray background-color-off-white',
];

const textClass = 'tw-text-sm tw-leading-7 first-letter:tw-text-5xl';
</script>

<template>
  <article>
    <div>
      <figure :class="imageContainerClass">
        <img
          alt="On the summit of Mt. Bierstadt"
          src="@/assets/images/2021-09-01-02-OnTheSummit.jpg"
        >
      </figure>
    </div>
    <div>
      <p :class="[textClass, 'tw-mb-8']">
        Welcome to the website of Mike DiLorenzo, husband, father, hiker, mountain biker, cross
        country skier, mountain enthusiast, craft beer drinker, front end web developer and
        overall nice guy.
      </p>
      <figure :class="imageContainerClass">
        <img
          alt="Top of Middlebury Ski Bowl"
          src="@/assets/images/2023-11-11-01-TopOfMiddleburySkiBowl.jpg"
        >
      </figure>
      <p :class="textClass">
        This website chronicles some of the more interesting things I've done: hiking, traveling,
        and landscaping. The site will be updated when I do cool things, so don't be discouraged if
        it isn't updated for a few months. Eventually coolness will return.
      </p>
    </div>
  </article>
</template>
