<script setup lang="ts">
import { ref } from 'vue'

const showQRCode = ref(false)
const showShareMenu = ref(false)

const handleShare = (platform: string) => {
  // TODO: 实现分享功能
  console.log(`Sharing to ${platform}`)
}

const generateImage = () => {
  // TODO: 实现生成图片功能
  console.log('Generating image...')
}

const copyLink = () => {
  // TODO: 实现复制链接功能
  console.log('Copying link...')
}
</script>

<template>
  <div class="share-panel">
    <h3>分享你的目标</h3>
    
    <div class="share-buttons">
      <button class="share-btn" @click="generateImage">
        <span class="icon">📸</span>
        <span>生成图片</span>
      </button>
      
      <button class="share-btn" @click="copyLink">
        <span class="icon">🔗</span>
        <span>复制链接</span>
      </button>
      
      <button class="share-btn" @click="showShareMenu = true">
        <span class="icon">📤</span>
        <span>分享</span>
      </button>
    </div>
    
    <!-- 分享菜单 -->
    <div v-if="showShareMenu" class="share-menu">
      <button @click="handleShare('wechat')" class="platform-btn">
        <span class="icon">💚</span>
        <span>微信</span>
      </button>
      <button @click="handleShare('weibo')" class="platform-btn">
        <span class="icon">❤️</span>
        <span>微博</span>
      </button>
      <button @click="handleShare('qq')" class="platform-btn">
        <span class="icon">💙</span>
        <span>QQ</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../styles/theme.scss';

.share-panel {
  margin-top: $spacing-large;
  padding: $spacing-medium;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  
  h3 {
    color: $primary-gold;
    text-align: center;
    margin-bottom: $spacing-medium;
  }
}

.share-buttons {
  display: flex;
  justify-content: center;
  gap: $spacing-medium;
  margin-bottom: $spacing-medium;
}

.share-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }
  
  .icon {
    font-size: 1.2rem;
  }
}

.share-menu {
  display: flex;
  justify-content: center;
  gap: $spacing-medium;
  margin-top: $spacing-medium;
  padding-top: $spacing-medium;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  .platform-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: $spacing-small;
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      transform: scale(1.1);
    }
    
    .icon {
      font-size: 2rem;
    }
  }
}

@media (max-width: $breakpoint-mobile) {
  .share-buttons {
    flex-direction: column;
    align-items: stretch;
  }
  
  .share-menu {
    flex-wrap: wrap;
  }
}
</style> 