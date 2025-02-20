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

<style scoped>
/* Navbar container */
.navbar {
  width: 100%;
  background-color: #03315c;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 4px 8px hsl(0, 0%, 0%)
}

/* Logo styling */
.logo {
  font-size: 36px;
  font-weight: bold;
  color: #ffd700;
  text-decoration: none;
}

/* Navigation links */
.nav-links {
  display: flex;
  gap: 30px;
  align-items: center;
}

/* Link styling */
.link {
  text-decoration: none;
  color: #ffd700;
  font-family: 'IM Fell DW Pica', serif;
  font-size: 36px;
  font-weight: bold;
  position: relative;
  transition: all 0.3s ease-in-out;
}

/* Hover effect */
.link:hover {
  color: #cab7d8;
  transform: scale(1.1);
}

/* Underline animation */
.link::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -4px;
  width: 0;
  height: 3px;
  background-color: #cab7d8;
  transition:
    width 0.3s ease-in-out,
    left 0.3s ease-in-out;
}

.link:hover::after {
  width: 100%;
  left: 0;
}

/* Hamburger menu */
.hamburger {
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 6px;
}

.hamburger span {
  width: 25px;
  height: 3px;
  background-color: #ffd700;
  border-radius: 2px;
  transition: all 0.3s ease-in-out;
}

/* Hamburger animation when open */
.hamburger span.open:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}

.hamburger span.open:nth-child(2) {
  opacity: 0;
}

.hamburger span.open:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}

/* Mobile styles */
@media (max-width: 768px) {
  .nav-links {
    position: absolute;
    top: 100%;
    right: -100%;
    width: 100%;
    background: #03315c;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px 0;
    transition: right 0.3s ease-in-out;
  }

  .nav-links.active {
    right: 0;
  }

  .hamburger {
    display: flex;
  }
}
</style>
