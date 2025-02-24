<template>
  <v-footer class="footer">
    <!-- Top -->
    <div class="footer-top">
      <strong>Stay connected for the latest updates! </strong>
    </div>

    <!-- Bottom -->
    <div class="footer-bottom">
      © {{ new Date().getFullYear() }} — <strong>Fortune Tarot</strong>
    </div>
  </v-footer>
</template>

<style scoped>
/* Base setup */
.footer {
  font-family: 'IM Fell DW Pica', sans-serif;
  font-size: 24px;
  text-align: center;
  background: #03315c;
  color: #cab7d8;
  box-shadow: 0 4px 8px hsl(0, 0%, 0%);

  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  padding: 1rem;
}

.footer-bottom {
  color: #ffd700;
}
</style>
