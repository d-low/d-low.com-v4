<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();

const hasPlace = route.params.place;
const hasYear = route.params.year;
</script>

<template>
  <p><strong>TODO:</strong>Display Listing View!</p>
  <ul>
    <li v-if="hasPlace">Place: {{ $route.params.place }}</li>
    <li v-if="hasYear">Year: {{ $route.params.year }}</li>
  </ul>
</template>