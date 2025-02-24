<script setup>
import { ref } from 'vue'

const step = ref(1)
const finished = ref(false)

// Alert message when finishe
function onClickFinish() {
  finished.value = true
  alert('Ready to draw the cards? May the cards reveal exactly what you need to hear!')
}

// Reset data when click
function resetStepper() {
  step.value = 1
  finished.value = false
}
</script>

<template>
  <v-stepper v-model="step" vertical>
    <v-stepper-items>
      <!-- Step 1 -->
      <v-stepper-content step="1">
        <template v-if="step === 1">
          <h2>Step 1</h2>
          <p>You can ask something specific or just see what the cards want to say to you.</p>
          <v-btn @click="step = 2">Next</v-btn>
        </template>
      </v-stepper-content>

      <!-- Step 2 -->
      <v-stepper-content step="2">
        <template v-if="step === 2">
          <h2>Step 2</h2>
          <p>Take a deep breath, calm your mind, and center yourself.</p>
          <v-btn @click="step = 3">Next</v-btn>
          <v-btn text @click="step = 1">Back</v-btn>
        </template>
      </v-stepper-content>

      <!-- Step 3 -->
      <v-stepper-content step="3">
        <template v-if="step === 3">
          <h2>Step 3</h2>
          <p>Click on the deck when you feel ready.</p>
          <v-btn @click="onClickFinish">Finish</v-btn>
          <v-btn text @click="step = 2">Back</v-btn>
          <v-btn v-if="finished" variant="plain" @click="resetStepper"> Reset </v-btn>
        </template>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<style scoped>
/* Base setup */
.v-stepper {
  background-color: #ead560;
  font-family: 'IM Fell DW Pica', sans-serif;
  color: #03315c;
  padding: 20px;
  border: 5px solid #000000;
  border-radius: 20px;
  max-width: 1200px;
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.v-stepper p {
  font-size: 24px;
  color: #000000;
}

/* V-button styling */
.v-btn {
  font-family: 'IM Fell DW Pica', sans-serif;
  font-size: 20px;
  font-weight: bold;
  border-radius: 20px;
  text-transform: uppercase; /* UPPERCASE */
  transition: all 0.3s ease;
  margin: 10px 10px; /* Add spacing between buttons */
}

.v-btn:not(.v-btn--text) {
  background-color: #03315c; /* Dark blue background */
  color: #ead560; /* Yellow text */
  border: 5px solid #000000;
}

/* button hover */
.v-btn:not(.v-btn--text):hover {
  background-color: #f5e1a1;
  color: #03315c;
  border-color: #03315c;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* shadow for button hover */
}

/* Text Button (Back) */
.v-btn.v-btn--text {
  background-color: transparent;
  color: #03315c;
  border: 2px solid transparent;
}

.v-btn.v-btn--text:hover {
  background-color: rgba(234, 213, 96, 0.2);
  color: #03315c;
}

/* Reset button */
.v-btn.v-btn--variant-plain {
  background-color: transparent;
  color: #d9534f;
  border: 5px solid #d9534f;
}

.v-btn.v-btn--variant-plain:hover {
  background-color: rgba(217, 83, 79, 0.1);
  color: #d9534f;
}
</style>
