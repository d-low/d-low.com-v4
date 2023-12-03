<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();

const hasPlace = route.params.place;
const hasYear = route.params.year;
const hasSeason = route.params.season;
const hasMonth = route.params.month;
</script>

<template>
  <p><strong>TODO:</strong>Display Post Listing View!</p>
  <ul>
    <li v-if="hasPlace">Place: {{ $route.params.place }}</li>
    <li v-if="hasYear">Year: {{ $route.params.year }}</li>
    <li v-if="hasSeason">Season: {{ $route.params.season }}</li>
    <li v-if="hasMonth">Month: {{ $route.params.month }}</li>
  </ul>
</template>