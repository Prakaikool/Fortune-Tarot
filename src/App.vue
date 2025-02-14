<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <router-link to="/">Fortune Tarot</router-link>
    <router-link to="/cards">All Cards</router-link>
  </nav>
  <router-view />
</template>

<style>
@import 'vuetify/styles';
nav {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 10px;
}
nav a {
  text-decoration: none;
  font-weight: bold;
}
</style>
