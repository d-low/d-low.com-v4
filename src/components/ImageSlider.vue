<script setup>
/**
 * @todo
 * - Display arrow navigation buttons?
 * - Slide down the list _after_ the current image is loaded
 * - Consolidate class names into single object for easier reference and to hide from view when
 *   not being used.
 * - The image caption is already passed in the images by the parent component so it doesn't need
 *   to be generated here again using getImageCaption()! Oops.
 * - Can the listHidden style to added to and removed from the listClass using Vue rather than
 *   manually adding and removing it with classList.add() and classList.remove()? Maybe?
 */
import { ref, useCssModule, watch } from 'vue';
import { useContentStore } from '@/stores/content';
import ImageLazyFade from '@/components/ImageLazyFade.vue';

const props = defineProps({
  images: {
    type: Array,
    default() { return []; },
  },
  initialImage: {
    type: Number,
    default: 0,
  },
  visible: {
    type: Boolean,
    default: false,
  },
});

const $emit = defineEmits(['hideImageSlider', 'imageSliderHidden']);

const currentImageIndex = ref(props.initialImage);
let observer;

const container = ref(null);
const list = ref(null);
const listItems = ref(null);

const $style = useCssModule();
const store = useContentStore();
const transitionDurationList = 250;

const containerClass = [
  'tw-fixed tw-z-10 tw-inset-0',
  'tw-w-screen tw-h-screen',
  'tw-overflow-x-auto tw-overflow-y-hidden tw-overscroll-contain',
  'tw-snap-mandatory tw-snap-x',
  $style.container,
];

const closeButtonClass = [
  'tw-fixed',
  'tw-top-2 tw-right-2 lg:tw-top-4 lg:tw-right-4',
  'tw-w-12 tw-h-12',
  'tw-border-2 tw-border-white tw-rounded-full',
];

const closeButtonTextClass = [
  'tw-inline-block',
  'tw-text-white',
  'tw-font-bold tw-text-3xl',
  'tw-rotate-45',
];

const listClass = [
  'tw-flex tw-items-center',
  'tw-h-full',
  $style.list,
  $style.listHidden,
];

const listItemClass = [
  'tw-flex tw-flex-col tw-justify-center tw-items-center',
  'tw-w-screen tw-h-3/5 md:tw-h-4/5 lg:tw-h-full',
  'tw-shrink-0',
  'tw-snap-start',
  $style.listItem,
];

const imageClass = 'tw-h-4/5 tw-mx-auto';

const imageCaptionClass = [
  'tw-mt-4 tw-py-2 tw-px-6 tw-border',
  'tw-font-bold tw-text-white tw-text-center tw-whitespace-nowrap',
  'image-label-background',
  $style.imageCaption,
];

const prevImage = () => {
  const prevImageIndex = currentImageIndex.value - 1;

  if (prevImageIndex >= 0) {
    listItems.value[prevImageIndex].scrollIntoView({ behavior: 'smooth' });
  }
};

const nextImage = () => {
  const nextImageIndex = currentImageIndex.value + 1;

  if (nextImageIndex < listItems.value.length) {
    listItems.value[nextImageIndex].scrollIntoView({ behavior: 'smooth' });
  }
};

/**
 * When the close button is clicked slide the list up and then emit the hide-image-slider event so
 * the parent component hides the image slider.
 */
const closeSlider = () => {
  list.value.classList.add($style.listHidden);

  window.setTimeout(() => {
    $emit('hideImageSlider');
  }, transitionDurationList);
};

const handleKeyUp = (e) => {
  if (e.key === 'ArrowLeft') {
    prevImage();
  } else if (e.key === 'ArrowRight') {
    nextImage();
  } else if (e.key === 'Escape') {
    closeSlider();
  }
};

const observeCallback = (entries) => {
  const intersectingEntry = entries.find((entry) => entry.isIntersecting);

  if (!intersectingEntry) {
    return;
  }

  const { target } = intersectingEntry;
  currentImageIndex.value = listItems.value.findIndex((listItem) => listItem === target);
};

const addNavigationEventHandlers = () => {
  observer = new IntersectionObserver(observeCallback);
  listItems.value.forEach((listItem) => observer.observe(listItem));
  document.addEventListener('keyup', handleKeyUp);
};

const removeNavigationEventHandlers = () => {
  listItems.value.forEach((listItem) => observer.unobserve(listItem));
  observer.disconnect();
  observer = null;
  document.removeEventListener('keyup', handleKeyUp);
};

watch(() => props.visible, () => {
  if (props.visible === false) {
    removeNavigationEventHandlers();
  }
});

const getImageCaption = (url, index) => `${store.getImageCaption(url)} - ${index + 1} of ${props.images.length}`;

/**
 * After the background has been faded slide the list down and then scroll the image image into
 * view.
 */
const handleAfterEnter = () => {
  const li = listItems.value[props.initialImage];
  const { x } = li.getBoundingClientRect();
  container.value.scrollLeft = x;

  window.setTimeout(() => {
    list.value.classList.remove($style.listHidden);
    window.setTimeout(addNavigationEventHandlers, 500);
  });
};
</script>

<template>
  <transition
    :enter-active-class="$style.visibleEnterActive"
    :enter-from-class="$style.visibleEnterFrom"
    :leave-active-class="$style.visibleLeaveActive"
    :leave-to-class="$style.visibleLeaveTo"
    @after-enter="handleAfterEnter"
  >
    <div
      v-show="visible"
      ref="container"
      :class="containerClass"
    >
      <button
        :class="closeButtonClass"
        @click="closeSlider"
      >
        <span :class="closeButtonTextClass">+</span>
      </button>
      <ul
        ref="list"
        :class="listClass"
      >
        <li
          v-for="(image, index) in images"
          :key="index"
          ref="listItems"
          :class="listItemClass"
        >
          <ImageLazyFade
            :class="imageClass"
            :loading="index === initialImage ? 'eager' : 'lazy'"
            object-fit="tw-object-contain"
            :src="image.href"
          />
          <span :class="imageCaptionClass">
            {{ getImageCaption(image.href, index) }}
          </span>
        </li>
      </ul>
    </div>
  </transition>
</template>

<style module>
.container {
  background-color: rgba(0 0 0 / 75%);

  --transition-duration-background: 0.5s;
  --transition-duration-list: 0.25s;
}

.visible-enter-active,
.visible-leave-active {
  transition: opacity var(--transition-duration-background) ease;
}

.visible-enter-from,
.visible-leave-to {
  opacity: 0;
}

.list {
  transition: transform var(--transition-duration-list) ease;
}

.listHidden {
  transform: translateY(-100%);
}

.listItem {
  margin-left: 10vh;
  margin-right: 10vh;
}

.imageCaption {
  border-color: var(--baltic-sea) var(--black-pearl) var(--baltic-sea) var(--black-pearl);
}
</style>
