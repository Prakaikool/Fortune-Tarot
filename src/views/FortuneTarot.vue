<script setup></script>

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

      <!-- Cards Front-side: index and image -->
      <div
        v-for="(card, index) in cards"
        :key="index"
        @click="flipCard(index)"
        :class="{ flipped: card.flipped }"
      >
        <div class="tarot-card-fronnt">
          <img
            v-if="card.iamge"
            :src="card.image"
            alt="Tarot Card Image"
            class="tarot-card-image"
          />
          <h3>{{ card.name }}</h3>
        </div>
      </div>
      <!-- Cards back-side: index, upright and reversed -->
      <div class="tarot-card-back">
        <h3>{{ card.name }}</h3>
        <p><strong>Meaning (Upright):</strong> {{ card.meaning_up }}</p>
        <p><strong>Meaning (Reversed):</strong>{{ card.meaning_rev }}</p>
      </div>
    </div>
  </div>
</template>

<style></style>
