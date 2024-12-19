<script setup lang="ts">
import { ref } from 'vue'

interface Stats {
  views: number
  shares: number
  likes: number
  comments: number
}

// 模拟数据
const stats = ref<Stats>({
  views: 0,
  shares: 0,
  likes: 0,
  comments: 0
})

// 模拟数据加载
setTimeout(() => {
  stats.value = {
    views: 128,
    shares: 23,
    likes: 45,
    comments: 12
  }
}, 1000)
</script>

<template>
  <div class="statistics">
    <div class="stat-item">
      <span class="icon">👀</span>
      <span class="value">{{ stats.views }}</span>
      <span class="label">浏览</span>
    </div>
    
    <div class="stat-item">
      <span class="icon">🔄</span>
      <span class="value">{{ stats.shares }}</span>
      <span class="label">分享</span>
    </div>
    
    <div class="stat-item">
      <span class="icon">❤️</span>
      <span class="value">{{ stats.likes }}</span>
      <span class="label">点赞</span>
    </div>
    
    <div class="stat-item">
      <span class="icon">💭</span>
      <span class="value">{{ stats.comments }}</span>
      <span class="label">评论</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../styles/theme.scss';

.statistics {
  display: flex;
  justify-content: center;
  gap: $spacing-large;
  padding: $spacing-medium;
  margin-top: $spacing-large;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  
  @media (max-width: $breakpoint-mobile) {
    flex-wrap: wrap;
    gap: $spacing-medium;
  }
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: $spacing-small;
  min-width: 80px;
  
  .icon {
    font-size: 1.5rem;
    opacity: 0.8;
  }
  
  .value {
    font-size: 1.2rem;
    font-weight: bold;
    color: $primary-gold;
  }
  
  .label {
    font-size: 0.9rem;
    color: rgba(white, 0.7);
  }
  
  &:hover {
    .icon {
      transform: scale(1.1);
      transition: transform 0.3s ease;
    }
    
    .value {
      color: white;
    }
  }
}
</style> 