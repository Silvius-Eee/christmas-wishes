<script setup lang="ts">
interface Props {
  position: 'center' | 'top-right'
  theme: 'primary' | 'secondary'
}

defineProps<Props>()
defineEmits<{
  (e: 'click'): void
  (e: 'hover'): void
}>()
</script>

<template>
  <div 
    class="create-entry"
    :class="[`position-${position}`, `theme-${theme}`]"
    @click="$emit('click')"
    @mouseenter="$emit('hover')"
  >
    <div class="button-content">
      <i class="icon">✨</i>
      <span class="text">创建祝福</span>
    </div>
    <div class="guide-text">点击开始创作您的圣诞祝福</div>
  </div>
</template>

<style lang="scss" scoped>
.create-entry {
  padding: var(--spacing-medium);
  border-radius: 8px;
  cursor: pointer;
  transition: transform var(--animation-duration) var(--animation-easing);
  
  &:hover {
    transform: scale(1.05);
  }
  
  &.position-center {
    text-align: center;
  }
  
  &.position-top-right {
    position: fixed;
    top: var(--spacing-large);
    right: var(--spacing-large);
  }
  
  &.theme-primary {
    background-color: var(--primary-color);
    color: white;
  }
  
  &.theme-secondary {
    background-color: var(--secondary-color);
    color: white;
  }
}

.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-small);
  
  .icon {
    font-size: 1.5rem;
  }
  
  .text {
    font-size: 1.2rem;
    font-weight: bold;
  }
}

.guide-text {
  margin-top: var(--spacing-small);
  font-size: 0.9rem;
  opacity: 0.8;
}
</style> 