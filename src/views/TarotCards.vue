<script setup>
import { ref, computed, onMounted } from 'vue'

// State variables
const cards = ref([])
const search = ref('')
const selectedType = ref('')
const selectedSuit = ref('')
const selectedCard = ref(null)

// Fetch Tarot Cards - get data  from API
const fetchTarotCards = async () => {
  try {
    const response = await fetch('https://tarotapi.dev/api/v1/cards')
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
    const data = await response.json()

    // Adds an image to each card
    cards.value = data.cards.map((card) => ({
      ...card,
      image: `/cards/${card.name_short}.png`,
    }))
  } catch (error) {
    console.error('Error fetching tarot cards:', error)
  }
}

// Computed property to filter cards (select)
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

// Show Card Details (Modal) popup card
const showCardDetails = (card) => {
  selectedCard.value = card
}

// Close funktion (Modal) popup card
const closeModal = () => {
  selectedCard.value = null
}

// Reset Suit when switching away from Minor Arcana
const resetSuitOnMinorSelect = () => {
  if (selectedType.value !== 'minor') {
    selectedSuit.value = ''
  }
}

// Fetch tarot cards when component is mounted
onMounted(fetchTarotCards)
</script>

<template>
  <div class="tarot-welcoming">
    <h1>Discover the Cards...</h1>
    <h2>
      Welcome to the Tarot Card Library, where you can explore the full deck of tarot cards and
      uncover their meanings. Each card carries deep symbolism, offering insights into life’s
      mysteries, challenges, and guidance.
    </h2>
  </div>
  <div class="tarot-app">
    <h1>All Cards ({{ filteredCards.length }})</h1>

    <!-- Search Input -->
    <input v-model="search" placeholder="🔮 Search for a card..." />

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
        <!-- Image and card name -->
        <img v-if="card.image" :src="card.image" alt="Tarot Card Image" class="tarot-card-image" />
        <h2>{{ card.name }}</h2>
      </div>
    </div>

    <!-- Modal for showing card details -->
    <div v-if="selectedCard" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <!-- Add close button for popup -->
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
/* Base setup for this page */
.tarot-app {
  text-align: center;
  font-family: 'IM Fell DW Pica', sans-serif;
  color: #03315c; /* Dark blue text color */
}

/* Welcomeming text setting */
.tarot-welcoming {
  background: #cab7d8;
  color: #000000;
  padding: 20vh 2rem;
  font-size: 36px;
  margin: 0 auto;
  max-width: 1200px;
  text-align: left;
}

.tarot-welcoming h2 {
  color: #000000;
  font-size: 36px;
  margin-top: 5vh;
}

/* Input Fields styling */
input,
select {
  text-align: center;
  padding: 10px;
  margin: 20px;
  border: 5px solid #000000;
  border-radius: 20px;
  background-color: #ead560; /* Yellow */
  color: #03315c; /* Text color dark blue */
  font-size: 24px; /* Text size on seaching bar */
  outline: none;
  transition: all 0.2s ease-in-out;
}

input {
  width: 100%; /* Input width */
  max-width: 600px;
  padding: 10px 20px; /* Padding inside the input */
  margin: 30px auto;
  font-size: 24px; /* Regular text size inside input */
  display: block;
}

input::placeholder {
  font-size: 24px;
  color: #03315c;
  opacity: 0.8;
}

/* Highlight when searching */
input:focus,
select:focus {
  border-color: #d5b25e; /* Soft yellow */
  background-color: #f5e1a1; /* Lighter yellow */
}

/* Select dropdown */
select {
  width: 150px;
  border-radius: 20px; /* Round form */
  appearance: none; /* Hide arrow on dropdwon */
  background-size: 12px;
  cursor: pointer; /* Hand point */
}

/* Make the card to colum */
.tarot-cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* To be center on the page */
  gap: 50px; /* Space between the cards */
  margin: 0 auto;
  max-width: 1500px;
  padding: 0 2rem;
}

/* Tarot cards styles */
.tarot-card {
  background-color: #03315c; /* Card color */
  color: #ead560;
  padding: 20px;
  border-radius: 10px;
  text-align: center; /* Name on center of the card */
  max-width: 250px; /* Cards size */
  box-shadow: #000000 0px 4px 10px; /* Add shadow for the cards */
  cursor: pointer; /* Hand point */
  transition:
    transform 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out;
}

/* Make animation or transition for the cards so it's can moving */
.tarot-card:hover {
  transform: scale(1.05);
  box-shadow: 0px 6px 15px #000000;
}

/* Set the images size */
.tarot-card-image {
  align-content: center; /* Center on the card */
  max-width: 100%;
  max-height: 70%;
  object-fit: contain;
  border-radius: 5px; /* Highlight the border of image with yellow color */
  border: 2px solid #ead560;
  margin-top: 30px;
}

/* Font size */
.tarot-card h2 {
  font-size: 24px;
  margin-top: 30px;
}

/* Modal overlay (Popup) for cards details */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%; /* Full screen */
  height: 100%;
  display: flex;
  justify-content: center; /* Modal be on center of page */
  align-content: center;
  z-index: 1000; /* Modal is ontop of the other content */
  background: #03315c; /* Background when modal is open */
  animation: fadeIn 0.3s ease-out;
}

/* No scrolling when modal is open */
.no-scroll {
  overflow: hidden;
}

/* Modal content */
.modal-content {
  background-color: #cab7d8; /* Modal or popup background */
  padding: 30px;
  border-radius: 15px;
  max-width: 800px;
  width: 90%;
  margin-top: 30px;
  max-height: 90vh;
  position: relative;
  align-content: center;
  box-shadow: 0 6px 18px #858484;
  overflow-y: auto; /* Can scrolling inside modal */
  animation:
    fadeIn 0.3s ease-out,
    slideIn 0.3s ease-out;
}

/* Fixed image size on popup */
.modal-tarot-image {
  width: 30%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 3px solid #ead560; /* Highlight border for the image */
}

/* Modal Title */
.modal-title {
  font-family: 'IM Fell DW Pica', sans-serif;
  font-size: 36px;
  font-weight: bold;
  color: #03315c;
  text-align: center;
  margin-bottom: 20px;
}

/* Text on the popup */
.modal-scrollable-content p {
  color: #03315c;
  text-align: left;
  font-size: 24px;
  line-height: 2rem;
}

/* Close Button, position, size and color */
.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: transparent;
  border: none;
  font-size: 36px;
  cursor: pointer;
  color: #03315c;
  transition: color 0.2s ease-in-out;
}

.close-button:hover {
  color: #ead560; /* Yellow hover effect when click*/
}

/* Animations */
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes slideIn {
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
