<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const savedData = ref(null)

onMounted(() => {
  try {
    const data = localStorage.getItem('wishCard')
    console.log('Retrieved data:', data) // 添加日志
    
    if (data) {
      savedData.value = JSON.parse(data)
      console.log('Parsed data:', savedData.value) // 添加日志
    } else {
      console.log('No saved data found')
      // 如果没有数据，跳转回首页
      router.push('/')
    }
  } catch (error) {
    console.error('Error loading saved data:', error)
    router.push('/')
  }
})

// 添加分享功能
const handleShare = () => {
  console.log('Share button clicked')
}
</script>

<template>
  <div class="saved-page">
    <!-- 雪花背景 -->
    <div class="snowflakes" aria-hidden="true">
      <div v-for="n in 50" :key="n" class="snowflake">
        {{ ['❅', '❆', '❄', '✧', '✦'][n % 5] }}
      </div>
    </div>
    
    <div class="saved-card" v-if="savedData">
      <div class="card-header">
        <div class="title">
          <span class="title-decor">✨</span>
          {{ savedData.nickname || '我' }}的2025愿望卡片
          <span class="title-decor">✨</span>
        </div>
        <div class="date">{{ new Date(savedData.date).toLocaleDateString() }}</div>
      </div>
      
      <div class="card-content">
        <!-- 展示愿望 -->
        <div class="goals-section" v-if="savedData.goals && savedData.goals.length">
          <h3>
            <span class="icon">🎁</span>
            新年愿望
          </h3>
          <div class="goals-list">
            <div 
              v-for="goal in savedData.goals" 
              :key="goal.id"
              class="goal-item"
            >
              <div class="goal-number">{{ goal.id }}</div>
              <div class="goal-content">{{ goal.content }}</div>
            </div>
          </div>
        </div>
        
        <!-- 展示祝福 -->
        <div class="blessing-section" v-if="savedData.blessing">
          <h3>
            <span class="icon">💝</span>
            新年祝福
          </h3>
          <div class="blessing-content">{{ savedData.blessing }}</div>
        </div>
      </div>
      
      <div class="card-footer">
        <div class="decorations">
          <span>🎄</span>
          <span>⭐</span>
          <span>🔔</span>
        </div>
        <div class="actions">
          <button class="action-button back" @click="router.back()">
            <span class="icon">👈</span>
            返回上一页
          </button>
          <button class="action-button home" @click="router.push('/')">
            <span class="icon">🏠</span>
            返回首页
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.saved-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a2a6c 0%, #2c3e50 100%);
  padding: 2rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.snowflakes {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
}

.saved-card {
  width: 90%;
  max-width: 600px;
  background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 2;
  animation: slideUp 0.5s ease;
}

.card-header {
  text-align: center;
  margin-bottom: 2.5rem;
  
  .title {
    font-size: 2rem;
    color: #ffd700;
    margin-bottom: 0.5rem;
    text-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
    
    .title-decor {
      margin: 0 0.5rem;
    }
  }
  
  .date {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.1rem;
  }
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  
  h3 {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    color: #ffd700;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    
    .icon {
      font-size: 1.6rem;
    }
  }
}

.goals-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.goal-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 1.2rem;
  border-radius: 12px;
  
  .goal-number {
    width: 36px;
    height: 36px;
    background: rgba(255, 215, 0, 0.2);
    border: 1px solid rgba(255, 215, 0, 0.4);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffd700;
    font-weight: bold;
    flex-shrink: 0;
  }
  
  .goal-content {
    color: white;
    line-height: 1.6;
    font-size: 1.1rem;
  }
}

.blessing-content {
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 12px;
  color: white;
  line-height: 1.8;
  font-size: 1.1rem;
}

.card-footer {
  margin-top: 3rem;
  text-align: center;
  
  .decorations {
    margin-bottom: 2rem;
    font-size: 1.8rem;
    display: flex;
    justify-content: center;
    gap: 2rem;
  }
  
  .actions {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
  }
}

.action-button {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  .icon {
    font-size: 1.3rem;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-3px);
  }
  
  &.back {
    background: rgba(255, 215, 0, 0.2);
    border-color: rgba(255, 215, 0, 0.4);
    color: #ffd700;
    
    &:hover {
      background: rgba(255, 215, 0, 0.3);
    }
  }
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(30px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .saved-card {
    padding: 1.5rem;
  }
  
  .card-header .title {
    font-size: 1.6rem;
  }
  
  .action-button {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
}

// 修复雪花动画
@keyframes snowfall {
  from {
    transform: translateY(-10vh);
  }
  to {
    transform: translateY(110vh);
  }
}

.snowflake {
  position: fixed;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.2rem;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
  will-change: transform;
  
  @for $i from 1 through 50 {
    &:nth-child(#{$i}) {
      $random-x: random(100);
      $random-offset: random(100);
      $random-x-end: $random-x + $random-offset;
      $fall-duration: random(35) + 15;
      $fall-delay: random(35) * -1;

      left: percentage($random-x / 100);
      top: -10%;
      opacity: random(10000) / 10000;
      animation: snowfall #{$fall-duration}s #{$fall-delay}s linear infinite;
    }
  }
}
</style> 