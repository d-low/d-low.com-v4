import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ListingView from '@/views/ListingView.vue';
import PostListingView from '@/views/PostListingView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
    },
    {
      path: '/04-Central_America/:year',
      component: PostListingView,
    },
    {
      path: '/02-South_America/:month',
      component: PostListingView,
    },
    {
      path: '/03-CDT/:month',
      component: PostListingView,
    },
    {
      path: '/:place/:year/:season',
      component: PostListingView,
    },
    {
      path: '/:place/:year',
      component: ListingView,
    },
    {
      path: '/:place',
      component: ListingView,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    /* eslint no-console: off */
    if (savedPosition) {
      return savedPosition;
    }

    // Don't scroll to the top of the page if there is a hash in the URL. Instead, let the view
    // component scroll to the element identified by the hash.

    if (to.hash) {
      return false;
    }

    return { behavior: 'smooth', top: 0 };
  },
});

export default router;
