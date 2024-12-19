import { ref, onMounted } from 'vue'

export function useAudioPreload(url: string) {
  const isLoaded = ref(false)
  const audioUrl = ref('')
  
  onMounted(async () => {
    try {
      // 动态导入音频资源
      const audio = await import(`../assets${url}`)
      audioUrl.value = audio.default
      
      // 预加载音频
      const tempAudio = new Audio()
      tempAudio.src = audioUrl.value
      
      tempAudio.addEventListener('canplaythrough', () => {
        isLoaded.value = true
      })
      
    } catch (error) {
      console.error('Failed to load audio:', error)
    }
  })
  
  return {
    isLoaded,
    audioUrl
  }
} 