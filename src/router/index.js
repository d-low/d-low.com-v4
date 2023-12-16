import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ListingView from '@/views/ListingView.vue';
import PostListingView from '@/views/PostListingView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView
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
    if (savedPosition) {
      return savedPosition;
    }

    return { behavior: 'smooth', top: 0 };
  },
});

export default router;
