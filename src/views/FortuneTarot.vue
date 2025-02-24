<script setup>
import { ref } from 'vue'
import SteppersVertical from '@/components/SteppersVertical.vue' // import the stepper component

// Cards array
const cards = ref([])

// Fetch random 3 cards
const drawCards = async () => {
  cards.value = [] // Clear cards

  const response = await fetch('https://tarotapi.dev/api/v1/cards/random?n=3') //API for random cards
  const data = await response.json()

  //Image for eatch card
  cards.value = data.cards.map((card) => ({
    ...card,
    flipped: false,
    image: `/cards/${card.name_short}.png`,
  }))
}
// To flip the card
const flipCard = (index) => {
  cards.value[index].flipped = !cards.value[index].flipped
}
</script>

<template>
  <div class="fortune-container">
    <div class="fortune-welcoming">
      <h1>Fortune Tarot</h1>
      <!-- Welcoming twxt -->
      <p>
        Welcome to the world of Fortune Tarot, where the cards hold the keys to your past, present,
        and future. On this page, you can draw three tarot cards and receive insights that may guide
        your path. Whether you're seeking answers, clarity, or a touch of magic, the cards are here
        to reveal your destiny.
      </p>
    </div>

    <!-- Stepper section -->
    <div class="step">
      <h2 class="how-to-play">How to play...</h2>
      <SteppersVertical class="stepper" />
      <!-- Put stepper here -->
    </div>

    <!-- Drawing cards section -->
    <div class="fortune-app">
      <h2>✦ Draw three Tarot cards here! ✦</h2>
      <p>*Three cards: past, present and future</p>

      <input type="button" @click="drawCards" value="DRAW!" class="draw-button" />
      <!-- Draw-button -->

      <div class="tarot-card-container" v-if="cards.length">
        <!-- Flipp the card to read about the cards meaning -->
        <div
          class="tarot-card"
          v-for="(card, index) in cards"
          :key="index"
          @click="flipCard(index)"
          :class="{ flipped: card.flipped }"
        >
          <!-- Cards Front-side: cards name and image -->
          <div class="tarot-card-front">
            <img
              v-if="card.image"
              :src="card.image"
              alt="Tarot Card Image"
              class="tarot-card-image"
            />
            <h3>{{ card.name }}</h3>
            <!-- cards name -->
          </div>

          <!-- Cards back-side: index, upright and reversed -->
          <div class="tarot-card-back">
            <h3>{{ card.name }}</h3>
            <!-- cards name -->
            <!-- Cards meaning -->
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
.fortune-container {
  text-align: center;
  font-family: 'IM Fell DW Pica', sans-serif;
  color: #03315c; /* Dark blue text color */
}

/* Welcomeming text - setting */
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

/* Stepper */
.how-to-play {
  font-size: 36px;
}

.stepper {
  margin-top: 2rem;
}

/* Drawing section */
.fortune-app {
  color: #000000;
  font-size: 24px;
  padding-left: 2rem;
  margin: 15vh auto;
  max-width: 1200px;
  text-align: left;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

/* Draw button */
.draw-button {
  font-family: 'IM Fell DW Pica', sans-serif;
  margin-top: 3.5rem;
  padding: 5px 20px;
  text-align: center;
  border: 5px solid #000000;
  border-radius: 20px;
  background-color: #ead560;
  color: #03315c;
  outline: none;
  transition: all 0.2s ease-in-out;
}

.draw-button:hover {
  background: #f5e1a1;
  color: #03315c;
  border-color: #d5b25e;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

/* Tarot card container */
.tarot-card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Center cards on the page */
  gap: 50px; /* Space between cards */
  margin: 0 auto;
  max-width: 1500px;
  padding: 2rem;
}

/* Cards sizes */
.tarot-card {
  width: 300px;
  height: 600px;
  perspective: 1000px; /* 3D effect */
  position: relative;
  cursor: pointer;
}

/* Common styles for front and back */
.tarot-card-front,
.tarot-card-back {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  backface-visibility: hidden;
  border-radius: 10px;
  box-shadow: #000000 0px 4px 10px; /* Add shadow */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.6s ease; /* Smooth flip animation */
}

/* Front Side */
.tarot-card-front {
  background-color: #03315c; /* Card color */
  color: #ead560;
  padding: 20px;
  transform: rotateY(0deg);
}

/* Img styling */
.tarot-card-front img {
  align-content: center;
  max-width: 100%;
  max-height: 70%;
  object-fit: contain;
  border: 2px solid #ead560;
  border-radius: 5px;
  margin-top: 30px;
}

.tarot-card-front h3 {
  font-size: 24px;
  margin-top: 30px;
  font-weight: bold;
  text-align: center;
}

/* Back Side */
.tarot-card-back {
  background-color: #ead560;
  color: #03315c;
  padding: 20px;
  transform: rotateY(180deg); /* Initially hidden */
  text-align: center;
}

.tarot-card-back h3 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 1rem;
}

.tarot-card-back p {
  font-size: 16px;
  line-height: 1.5;
  margin: 0.5rem 0;
}

/* Flip Effect */
.tarot-card.flipped .tarot-card-front {
  transform: rotateY(-180deg); /* Front flips away */
}

.tarot-card.flipped .tarot-card-back {
  transform: rotateY(0deg); /* Back becomes visible */
}
</style>
