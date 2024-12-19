<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useAnimationFrame } from '../../utils/performance'

interface Props {
  density: number
  animation: {
    duration: number
    easing: string
  }
}

const props = defineProps<Props>()

const createSnowflake = () => {
  const snowflake = document.createElement('div')
  snowflake.className = 'snowflake'
  
  // 随机大小
  const size = Math.random() * 10 + 5
  snowflake.style.width = `${size}px`
  snowflake.style.height = `${size}px`
  
  // 随机起始位置
  snowflake.style.left = `${Math.random() * 100}vw`
  
  // 随机透明度
  snowflake.style.opacity = `${Math.random() * 0.6 + 0.2}`
  
  // 随机动画时长
  const duration = props.animation.duration * (Math.random() * 0.5 + 0.75)
  snowflake.style.animationDuration = `${duration}ms`
  
  // 随机水平摆动
  const swing = Math.random() * 40 - 20
  snowflake.style.setProperty('--swing', `${swing}px`)
  
  document.querySelector('.snow-container')?.appendChild(snowflake)
  
  setTimeout(() => {
    snowflake.remove()
  }, duration)
}

const { start, stop } = useAnimationFrame(() => {
  if (Math.random() < props.density) {
    createSnowflake()
  }
})

onMounted(() => {
  start()
})

onUnmounted(() => {
  stop()
})
</script>

<template>
  <div class="snow-container"></div>
</template>

<style lang="scss" scoped>
.snow-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
}

.snowflake {
  position: absolute;
  background: white;
  border-radius: 50%;
  will-change: transform;
  transform: translateZ(0);
  
  @keyframes fall {
    0% {
      transform: translateY(0) translateX(0);
    }
    50% {
      transform: translateY(50vh) translateX(var(--swing));
    }
    100% {
      transform: translateY(100vh) translateX(0);
    }
  }
  
  animation: fall linear forwards;
}
</style> 