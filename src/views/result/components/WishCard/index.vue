<script setup lang="ts">
interface Props {
  goals: Array<{
    id: number
    content: string
  }>
  blessing: string
  visible: boolean
}

defineProps<Props>()
const emit = defineEmits(['close'])

const handleClose = () => {
  console.log('WishCard: Close button clicked')
  emit('close')
}
</script>

<template>
  <Transition name="fade">
    <div 
      class="wish-card-overlay"
      v-if="visible"
      @click="handleClose"
    >
      <div class="wish-card" @click.stop>
        <div class="card-header">
          <div class="title">
            <span class="title-decor">✨</span>
            2025年愿望卡片
            <span class="title-decor">✨</span>
          </div>
          <div class="date">{{ new Date().toLocaleDateString() }}</div>
        </div>
        
        <div class="card-content">
          <div class="goals-section">
            <h3>
              <span class="icon">🎁</span>
              新年愿望
            </h3>
            <div class="goals-list">
              <div 
                v-for="goal in goals" 
                :key="goal.id"
                class="goal-item"
                v-if="goal.content.trim()"
              >
                <div class="goal-number">{{ goal.id }}</div>
                <div class="goal-content">{{ goal.content }}</div>
              </div>
            </div>
          </div>
          
          <div class="blessing-section" v-if="blessing.trim()">
            <h3>
              <span class="icon">💝</span>
              新年祝福
            </h3>
            <div class="blessing-content">{{ blessing }}</div>
          </div>
        </div>
        
        <div class="card-footer">
          <div class="decorations">
            <span>🎄</span>
            <span>⭐</span>
            <span>🔔</span>
          </div>
          <button class="close-button" @click="handleClose">
            收起卡片
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.wish-card-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  animation: fadeIn 0.3s ease;
}

.wish-card {
  width: 90%;
  max-width: 500px;
  background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: slideUp 0.3s ease;
}

.card-header {
  text-align: center;
  margin-bottom: 2rem;
  
  .title {
    font-size: 1.8rem;
    color: #ffd700;
    margin-bottom: 0.5rem;
    text-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
    
    .title-decor {
      margin: 0 0.5rem;
    }
  }
  
  .date {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1rem;
  }
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  
  h3 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #ffd700;
    font-size: 1.3rem;
    margin-bottom: 1rem;
    
    .icon {
      font-size: 1.4rem;
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
  padding: 1rem;
  border-radius: 10px;
  
  .goal-number {
    width: 32px;
    height: 32px;
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
    line-height: 1.5;
  }
}

.blessing-content {
  background: rgba(255, 255, 255, 0.1);
  padding: 1.2rem;
  border-radius: 10px;
  color: white;
  line-height: 1.6;
}

.card-footer {
  margin-top: 2rem;
  text-align: center;
  
  .decorations {
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    gap: 1.5rem;
  }
  
  .close-button {
    padding: 0.8rem 2rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 50px;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
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
  .wish-card {
    padding: 1.5rem;
  }
  
  .card-header .title {
    font-size: 1.5rem;
  }
}

// 添加过渡动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 