<script setup lang="ts">
import { useWindowSize } from '../../utils/responsive'
import { computed } from 'vue'

const { width } = useWindowSize()

const layoutClass = computed(() => {
  if (width.value < 768) return 'mobile'
  if (width.value < 1024) return 'tablet'
  return 'desktop'
})
</script>

<template>
  <div class="page-layout" :class="layoutClass">
    <header class="header">
      <slot name="header"></slot>
    </header>
    
    <main class="content">
      <slot name="content"></slot>
    </main>
    
    <footer class="footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.page-layout {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: transparent;
  color: var(--text-primary);
  
  &.mobile {
    padding: var(--spacing-medium);
    
    .header {
      margin-bottom: var(--spacing-medium);
    }
  }
  
  &.tablet {
    padding: var(--spacing-large);
    
    .header {
      margin-bottom: var(--spacing-large);
    }
  }
  
  &.desktop {
    padding: var(--spacing-large) calc(var(--spacing-large) * 2);
    
    .header {
      margin-bottom: calc(var(--spacing-large) * 1.5);
    }
  }
}

.header {
  width: 100%;
}

.content {
  flex: 1;
  width: 100%;
}

.footer {
  width: 100%;
  padding: var(--spacing-large) 0;
}
</style> 