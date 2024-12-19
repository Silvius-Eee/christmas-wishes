<script setup lang="ts">
</script>

<template>
  <div class="background-container">
    <div class="night-sky">
      <div class="stars" v-for="i in 50" :key="i"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to bottom, #0f2027, #203a43, #2c5364);
  z-index: -2;
  overflow: hidden;
}

.night-sky {
  width: 100%;
  height: 100%;
  position: relative;
}

.stars {
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  animation: twinkle 1s infinite alternate;
  
  @for $i from 1 through 50 {
    &:nth-child(#{$i}) {
      left: random(100) * 1%;
      top: random(100) * 1%;
      animation-delay: random(1000) * 1ms;
    }
  }
}

@keyframes twinkle {
  0% {
    opacity: 0.2;
    transform: scale(1);
  }
  100% {
    opacity: 1;
    transform: scale(1.5);
  }
}
</style> 