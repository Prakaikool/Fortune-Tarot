<script setup>
import { ref } from 'vue'

const selectedItems = ref([])
</script>

<template>
  <v-container>
    <h1>Card description</h1>

    <v-combobox
      v-model="selectedItems"
      multiple
      label="Search for a card"
      :items="['The Major Arcana', 'Wands', 'Cups', 'Swords', 'Pentacles']"
      variant="solo-filled"
      clearable
    ></v-combobox>
  </v-container>
</template>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
