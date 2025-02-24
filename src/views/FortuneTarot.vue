<script setup>
import { ref } from 'vue'
import SteppersVertical from '@/components/SteppersVertical.vue' // import the step component

// Cards array
const cards = ref([])

// Fetch random 3 cards
const drawCards = async () => {
  cards.value = [] // Clear cards

  const response = await fetch('https://tarotapi.dev/api/v1/cards/random?n=3')
  const data = await response.json()

  cards.value = data.cards.map((card) => ({
    ...card,
    flipped: false,
    image: `/cards/${card.name_short}.png`,
  }))
}
</script>

<template>
  <div class="fortune-container">
    <div class="fortune-welcoming">
      <h1>Fortune Tarot</h1>
      <p>
        Welcome to the world of Fortune Tarot, where the cards hold the keys to your past, present,
        and future. On this page, you can draw three tarot cards and receive insights that may guide
        your path. Whether you're seeking answers, clarity, or a touch of magic, the cards are here
        to reveal your destiny.
      </p>
    </div>

    <div class="step">
      <h2>How to play...</h2>
      <SteppersVertical />
    </div>

    <div class="fortune-app">
      <h2>Draw three Tarot cards here!</h2>
      <p>*Three cards: past, present and future</p>

      <input type="button" @click="drawCards" value="DRAW!" />

      <div class="tarot-card-container" v-if="cards.length">
        <div
          class="tarot-card"
          v-for="(card, index) in cards"
          :key="index"
          @click="flipCard(index)"
          :class="{ flipped: card.flipped }"
        >
          <!-- Cards Front-side: index and image -->
          <div class="tarot-card-front">
            <img
              v-if="card.image"
              :src="card.image"
              alt="Tarot Card Image"
              class="tarot-card-image"
            />
            <h3>{{ card.name }}</h3>
          </div>
          <!-- Cards back-side: index, upright and reversed -->
          <div class="tarot-card-back">
            <h3>{{ card.name }}</h3>
            <p><strong>Meaning (Upright):</strong> {{ card.meaning_up }}</p>
            <p><strong>Meaning (Reversed):</strong>{{ card.meaning_rev }}</p>
          </div>
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
.fortune-welcoming {
  color: #000000;
  padding: 20vh 2rem;
  font-size: 36px;
  margin: 15vh auto;
  max-width: 1200px;
  text-align: left;
}

.fortune-welcoming p {
  color: #000000;
  font-size: 36px;
}

.step {
  max-width: 1200px;
}
</style>
