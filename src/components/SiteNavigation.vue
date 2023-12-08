<script setup>
import { RouterLink } from 'vue-router';
import { useContentStore } from '@/stores/content';

const store = useContentStore();
const links = store.getLinks({ path: '/' });
</script>

<template>
  <nav>
    <ul>
      <li
        v-for="link in links"
        :key="link.href"
      >
        <RouterLink
          :to="link.href"
        >
          {{ link.name  }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>