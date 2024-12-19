import { ref, onMounted, onUnmounted, computed } from 'vue'

export function useWindowSize() {
  const width = ref(window.innerWidth)
  const height = ref(window.innerHeight)

  const handleResize = () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })

  return {
    width,
    height
  }
}

export function useBreakpoints() {
  const windowSize = useWindowSize()
  
  return {
    isMobile: computed(() => windowSize.width.value < 768),
    isTablet: computed(() => windowSize.width.value >= 768 && windowSize.width.value < 1024),
    isDesktop: computed(() => windowSize.width.value >= 1024)
  }
} 