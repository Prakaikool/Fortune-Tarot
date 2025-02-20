<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const sparkles = ref([])

const createSparkle = () => {
  const id = Date.now() + Math.random()
  const sparkle = {
    id,
    left: `${Math.random() * 100}%`, // random position
    top: `${Math.random() * 100}%`, // random position
    size: `${Math.random() * 10 + 6}px`, // Random size between 6px and 16px
  }
  sparkles.value.push(sparkle)

  setTimeout(() => {
    sparkles.value = sparkles.value.filter((s) => s.id !== id) // Remove sparkle
  }, 1500)
}

let sparkleInterval

onMounted(() => {
  sparkleInterval = setInterval(createSparkle, 400)
})

onUnmounted(() => {
  clearInterval(sparkleInterval)
})
</script>

<template>
  <div class="sparkle-container">
    <div
      v-for="sparkle in sparkles"
      :key="sparkle.id"
      class="sparkle"
      :style="{ left: sparkle.left, top: sparkle.top, width: sparkle.size, height: sparkle.size }"
    ></div>
  </div>
</template>

<style scoped>
.sparkle-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
}

.sparkle {
  position: absolute;
  background: radial-gradient(circle, #ead560, #d5b25e00);
  border-radius: 50%;
  animation: sparkleAnimation 1.5s ease-out forwards;
}

@keyframes sparkleAnimation {
  0% {
    opacity: 1;
    transform: scale(0.5) translateY(0);
  }
  50% {
    opacity: 0.8;
    transform: scale(1) translateY(-10px);
  }
  100% {
    opacity: 0;
    transform: scale(1.5) translateY(-20px);
  }
}
</style>
