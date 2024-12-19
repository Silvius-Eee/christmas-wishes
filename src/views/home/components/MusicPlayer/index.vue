<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAudioPreload } from '../../utils/audio'

interface Props {
  autoplay?: boolean
  loop?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  autoplay: true,
  loop: true
})

const isPlaying = ref(false)
const audioElement = ref<HTMLAudioElement>()

// 预加载音频资源
const { isLoaded, audioUrl } = useAudioPreload('/music/christmas-bgm.mp3')

const togglePlay = () => {
  if (!audioElement.value || !isLoaded.value) return
  
  if (isPlaying.value) {
    audioElement.value.pause()
  } else {
    audioElement.value.play()
  }
  isPlaying.value = !isPlaying.value
}

onMounted(() => {
  if (props.autoplay && isLoaded.value) {
    togglePlay()
  }
})
</script>

<template>
  <div class="music-player">
    <audio
      ref="audioElement"
      :src="audioUrl"
      :loop="loop"
      preload="auto"
    ></audio>
    
    <button 
      class="control-btn"
      :class="{ 'is-playing': isPlaying }"
      @click="togglePlay"
      :disabled="!isLoaded"
    >
      <i class="icon">{{ isPlaying ? '🔊' : '🔇' }}</i>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.music-player {
  position: fixed;
  top: var(--spacing-large);
  right: var(--spacing-large);
  z-index: 100;
}

.control-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  border: none;
  cursor: pointer;
  transition: all var(--animation-duration) var(--animation-easing);
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  
  &.is-playing {
    animation: rotate 3s linear infinite;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .icon {
    font-size: 1.2rem;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style> 