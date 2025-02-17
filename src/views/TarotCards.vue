<script setup>
import { ref } from 'vue'
</script>

<template>
  <div class="tarot-app">
    <h1>All Cards</h1>

    <!-- Search Input -->
    <input v-model="search" placeholder="Search for a card..." />

    <!-- Filter by type -->
    <select v-model="SelectedTyp" @change="resetSuitOnMinorSelect">
      <option value="">All types</option>
      <option value="major">Major Arcana</option>
      <option value="minor">Minor Arcana</option>
    </select>

    <select v-model="selectedSuit" v-if="selectedType === 'minor'"></select>
    <option value="">All Suits</option>
    <option value="wands">Wands</option>
    <option value="swords">Swords</option>
    <option value="pentacles">Pentacles</option>
    <option value="cups">Cups</option>
  </div>
</template>

<style scoped></style>
