<script setup>
import { ref, computed, onMounted } from 'vue'

// State variables
const cards = ref([])
const search = ref('')
const selectedType = ref('')
const selectedSuit = ref('')
const selectedCard = ref(null)

// **Fetch Tarot Cards**
const fetchTarotCards = async () => {
  try {
    const response = await fetch('https://tarotapi.dev/api/v1/cards')
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
    const data = await response.json()

    cards.value = data.cards.map((card) => ({
      ...card,
      image: `/cards/${card.name_short}.png`,
    }))
  } catch (error) {
    console.error('Error fetching tarot cards:', error)
  }
}

// **Computed property to filter cards**
const filteredCards = computed(() => {
  return cards.value.filter((card) => {
    const matchesSearch = card.name.toLowerCase().includes(search.value.toLowerCase())
    const matchesType = selectedType.value ? card.type.toLowerCase() === selectedType.value : true
    const matchesSuit =
      selectedType.value === 'minor'
        ? selectedSuit.value
          ? card.suit && card.suit.toLowerCase() === selectedSuit.value
          : true
        : true

    return matchesSearch && matchesType && matchesSuit
  })
})

// **Show Card Details (Modal)**
const showCardDetails = (card) => {
  selectedCard.value = card
}

// **Close Modal**
const closeModal = () => {
  selectedCard.value = null
}

// **Reset Suit when switching away from Minor Arcana**
const resetSuitOnMinorSelect = () => {
  if (selectedType.value !== 'minor') {
    selectedSuit.value = ''
  }
}

// Fetch tarot cards when component is mounted
onMounted(fetchTarotCards)
</script>

<template>
  <div class="tarot-app">
    <h1>All Cards ({{ filteredCards.length }})</h1>

    <!-- Search Input -->
    <input v-model="search" placeholder="Search for a card..." />

    <!-- Filter by Type -->
    <select v-model="selectedType" @change="resetSuitOnMinorSelect">
      <option value="">All Types</option>
      <option value="major">Major Arcana</option>
      <option value="minor">Minor Arcana</option>
    </select>

    <!-- Filter by Suit (Only if Minor Arcana is selected) -->
    <select v-model="selectedSuit" v-if="selectedType === 'minor'">
      <option value="">All Suits</option>
      <option value="wands">Wands</option>
      <option value="swords">Swords</option>
      <option value="pentacles">Pentacles</option>
      <option value="cups">Cups</option>
    </select>

    <!-- Tarot Cards Display -->
    <div class="tarot-cards-container">
      <div
        class="tarot-card"
        v-for="card in filteredCards"
        :key="card.id"
        @click="showCardDetails(card)"
      >
        <img v-if="card.image" :src="card.image" alt="Tarot Card Image" class="tarot-card-image" />
        <h2>{{ card.name }}</h2>
      </div>
    </div>

    <!-- Modal for showing card details -->
    <div v-if="selectedCard" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-button" @click="closeModal">X</button>
        <img :src="selectedCard.image" alt="Tarot Card Image" class="modal-tarot-image" />
        <h2 class="modal-title">{{ selectedCard.name }}</h2>
        <div class="modal-scrollable-content">
          <p><strong>Meaning (Upright):</strong> {{ selectedCard.meaning_up }}</p>
          <p><strong>Meaning (Reversed):</strong> {{ selectedCard.meaning_rev }}</p>
          <p><strong>Description:</strong> {{ selectedCard.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Base setup */
.tarot-app {
  text-align: center;
  font-family: 'IM Fell DW Pica', sans-serif;
  background-color: #cab7d8; /* Light purple */
  color: #03315c; /* Dark blue text color */
  padding: 20px;
}

/* Input Fields styling */
input, select {
  padding: 10px;
  margin: 5px;
  border: 2px solid #03315c; /* Dark blue */
  border-radius: 5px;
  background-color: #ead560; /* Yellow */
  color: #03315c; /* Text color */
  font-size: 1rem; /* Text size on seaching bar */
  outline: none;
  transition: all 0.2s ease-in-out;
}

input::placeholder {
  color: #03315c;
  opacity: 07.;
}

/* Highlight when searching */
input:focus, select:focus {
  border-color: #d5b25e; /* Soft yellow */
  background-color: #f5e1a1; /* Lighter yellow */
}

/* Select dropdown */
select {
  padding: 10px;
  border-radius: 20px; /* Round form */
  appearance: none; /* Hide arrow on dropdwon */
  background-size: 12px ;
  cursor: pointer; /* Hand click */
}

/* Make the card to colum */
.tarot-cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* To be on the page center */
  gap: 20px; /* Space between the card */
  margin-top: 20px;
}
</style>
