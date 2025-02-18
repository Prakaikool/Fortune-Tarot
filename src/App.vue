<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <div class="nav-container">
      <router-link to="/">Home</router-link>
      <router-link to="/cards">Cards</router-link>
    </div>
  </nav>
  <router-view />
</template>

<style>
/* Navbar setting */
nav {
  background: #03315c;
  padding: 20px 0;
}

.nav-container {
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
  color: #cab7d8;
  transform: scale(1.1);
}

nav a::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -2px;
  width: 0;
  height: 3px;
  background-color: #cab7d8;
  transition: all 0.3s ease-in-out;
}

nav a:hover::after {
  width: 100%;
  left: 0;
}
</style>
