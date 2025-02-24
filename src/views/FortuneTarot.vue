<script setup>
import { ref } from 'vue'

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

// Flip the card for cards meaning
const flipCard = (index) => {
  cards.value[index].flipped = !cards.value[index].flipped
}
</script>

<template>
  <div class="fortune-container">
    <div class="fortune-welcoming">
      <h1>Fortune Tarot</h1>
    </div>

    <div>
      <p>
        Welcome to the world of Fortune Tarot, where the cards hold the keys to your past, present,
        and future. On this page, you can draw three tarot cards and receive insights that may guide
        your path. Whether you're seeking answers, clarity, or a touch of magic, the cards are here
        to reveal your destiny.
      </p>
    </div>

    <div class="step">
      <h2>How to play...</h2>
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
