<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  page: {
    required: true,
    type: String,
  },
})
</script>

<template>
  <nav class="navbar">
    <router-link class="link" to="/" :class="{ isActive: props.page === 'home' }">Home</router-link>
    <router-link class="link" to="/cards" :class="{ isActive: props.page === 'cards' }"
      >Cards</router-link
    >
  </nav>
</template>

<style scoped>
/* Navbar styling */
nav {
  width: 100%;
  background: #03315c;
  padding: 20px 0;
  position: relative;
  z-index: 2;
}

.navbar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

nav a {
  text-decoration: none;
  color: #ffd700;
  font-family: 'IM Fell DW Pica', serif;
  font-size: 1.8rem;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  position: relative;
}

nav a:hover {
  color: #000000;
  transform: scale(1.1);
}

nav a::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -2px;
  width: 0;
  height: 3px;
  background-color: #000000;
  transition: all 0.3s ease-in-out;
}

nav a:hover::after {
  width: 100%;
  left: 0;
}

/* Navbar responsiv */
@media (max-width: 768px) {
  .nav-container {
    justify-content: center;
    gap: 20px;
  }

  nav a {
    font-size: 1.4rem;
  }
}

@media (max-width: 480px) {
  .nav-container {
    flex-direction: column;
    gap: 10px;
  }

  nav a {
    font-size: 1.2rem;
  }
}
</style>
