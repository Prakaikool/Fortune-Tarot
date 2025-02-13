<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/cards">Tarot</RouterLink>
  </div>
  <div>
    <RouterView />
  </div>
</template>
