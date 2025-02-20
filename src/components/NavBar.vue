<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const props = defineProps({
  page: {
    required: true,
    type: String,
  },
})

// Toogle menu
const menuOpen = ref(false)
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}
</script>

<template>
  <nav class="navbar">
    <div class="logo">Fortune Tarot</div>

    <div class="hamburger" @click="toggleMenu">
      <span :class="{ open: menuOpen }"></span>
      <span :class="{ open: menuOpen }"></span>
      <span :class="{ open: menuOpen }"></span>
    </div>

    <div class="nav-links" :class="{ active: menuOpen }">
      <router-link class="link" to="/" :class="{ isActive: props.page === 'home' }"
        >Home</router-link
      >
      <router-link class="link" to="/cards" :class="{ isActive: props.page === 'cards' }"
        >Cards</router-link
      >
    </div>
  </nav>
</template>

<style scoped></style>
