import { ref, onMounted } from 'vue'

// 图片懒加载
export function useLazyImage(src: string) {
  const imageSrc = ref('')
  const imageRef = ref<HTMLImageElement>()
  
  onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          imageSrc.value = src
          observer.disconnect()
        }
      })
    })
    
    if (imageRef.value) {
      observer.observe(imageRef.value)
    }
  })
  
  return {
    imageSrc,
    imageRef
  }
}

// 动画帧控制
export function useAnimationFrame(callback: () => void) {
  let animationFrameId: number
  
  const start = () => {
    const animate = () => {
      callback()
      animationFrameId = requestAnimationFrame(animate)
    }
    animate()
  }
  
  const stop = () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
    }
  }
  
  return {
    start,
    stop
  }
} 