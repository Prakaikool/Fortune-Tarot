<script setup>
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import NavBar from './components/NavBar.vue'

const route = useRoute()
const currentPage = computed(() => route.name)
</script>

<template>
  <div>
    <NavBar :page="currentPage" />
    <RouterView />
  </div>
</template>

<style>
/* Global styles */
html,
body {
  margin: 0;
  padding: 0;
  background:
    radial-gradient(ellipse at top, #cab7d8, transparent),
    radial-gradient(ellipse at bottom, #ead560, transparent);
  box-sizing: border-box;
  font-family: 'IM Fell DW Pica', sans-serif;
  overflow: hidden;
}
</style>
