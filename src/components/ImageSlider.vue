<script setup>
/**
 * @todo
 * - Display arrow navigation buttons?
 * - Slide down the list _after_ the current image is loaded
 * - Can the listHidden style to added to and removed from the listClass using Vue rather than
 *   manually adding and removing it with classList.add() and classList.remove()? Maybe?
 */
import { ref, useCssModule, watch } from 'vue';
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
const transitionDurationList = 250;

const classNames = {
  container: [
    'tw-fixed tw-z-10 tw-inset-0',
    'tw-w-screen tw-h-screen',
    'tw-overflow-x-auto tw-overflow-y-hidden tw-overscroll-contain',
    'tw-snap-mandatory tw-snap-x',
    $style.container,
  ],

  closeButton: [
    'tw-fixed tw-z-20',
    'tw-top-2 tw-right-2 lg:tw-top-4 lg:tw-right-4',
    'tw-w-12 tw-h-12',
    'tw-border-2 tw-border-white tw-rounded-full',
  ],

  closeButtonText: [
    'tw-inline-block',
    'tw-text-white',
    'tw-font-bold tw-text-3xl',
    'tw-rotate-45',
  ],

  list: [
    'tw-flex tw-items-center',
    'tw-h-full',
    $style.list,
    $style.listHidden,
  ],

  listItem: [
    'tw-flex tw-flex-col tw-justify-center tw-items-center',
    'tw-w-screen tw-h-3/5 md:tw-h-4/5 lg:tw-h-full',
    'tw-shrink-0',
    'tw-snap-start',
    $style.listItem,
  ],

  image: 'tw-h-4/5 tw-mx-auto',

  imageCaption: [
    'tw-mt-4 tw-py-2 tw-px-6 tw-border',
    'tw-font-bold tw-text-white tw-text-center tw-whitespace-nowrap',
    'image-label-background',
    $style.imageCaption,
  ],

  imageButton: [
    'tw-fixed tw-top-0',
    'tw-w-20 md:tw-w-28 tw-h-full',
    'tw-transition-opacity tw-opacity-0 hover:tw-opacity-50',
  ],

  nextImageButton: 'tw-right-0',

  prevImageButton: 'tw-left-0',

  imageIcon: [
    'tw-absolute tw-top-1/2 tw-z-10',
    'tw-w-3 tw-h-20 tw--mt-10',
    'tw-transform',
    'before:tw-absolute before:tw-top-1',
    'before:tw-w-full',
    'before:tw-bg-white',
    'before:tw-rounded',
    'before:tw-cursor-pointer',
    'before:tw-h-1/2',
    'after:tw-absolute after:tw-bottom-1',
    'after:tw-w-full',
    'after:tw-bg-white',
    'after:tw-rounded',
    'after:tw-cursor-pointer',
    'after:tw-h-1/2',
  ],

  nextImageIcon: $style.nextImageIcon,

  prevImageIcon: $style.prevImageIcon,
};

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
      :class="classNames.container"
    >
      <button
        :class="classNames.closeButton"
        @click="closeSlider"
      >
        <span :class="classNames.closeButtonText">+</span>
      </button>
      <button
        :class="[classNames.imageButton, classNames.prevImageButton]"
        @click="prevImage"
      >
        <span :class="[classNames.imageIcon, classNames.prevImageIcon]" />
      </button>
      <button
        :class="[classNames.imageButton, classNames.nextImageButton]"
        @click="nextImage"
      >
        <span :class="[classNames.imageIcon, classNames.nextImageIcon]" />
      </button>
      <ul
        ref="list"
        :class="classNames.list"
      >
        <li
          v-for="(image, index) in images"
          :key="index"
          ref="listItems"
          :class="classNames.listItem"
        >
          <ImageLazyFade
            :class="classNames.image"
            :loading="index === initialImage ? 'eager' : 'lazy'"
            object-fit="tw-object-contain"
            :src="image.href"
          />
          <span :class="classNames.imageCaption">
            {{ image.caption }}
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

.nextImageIcon::before,
.prevImageIcon::after {
  transform: rotate(-20deg);
}

.nextImageIcon::after,
.prevImageIcon::before {
  transform: rotate(20deg);
}
</style>
