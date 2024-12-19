<script setup lang="ts">
import { useTheme } from '../../utils/theme'

const { currentTheme, toggleTheme } = useTheme()
</script>

<template>
  <button 
    class="theme-toggle"
    @click="toggleTheme"
  >
    <i class="icon">{{ currentTheme === 'light' ? '🌞' : '🌙' }}</i>
  </button>
</template>

<style lang="scss" scoped>
.theme-toggle {
  position: fixed;
  top: var(--spacing-large);
  left: var(--spacing-large);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  border: none;
  cursor: pointer;
  transition: all var(--animation-duration) var(--animation-easing);
  z-index: 100;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: rotate(45deg);
  }
  
  .icon {
    font-size: 1.2rem;
  }
}
</style> 