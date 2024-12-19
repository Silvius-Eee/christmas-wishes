<template>
  <div class="home">
    <!-- 雪花背景 -->
    <div class="snowflakes" aria-hidden="true">
      <div v-for="n in 12" :key="n" class="snowflake">❅</div>
    </div>
    
    <div class="content">
      <!-- 圣诞树装饰 -->
      <div class="christmas-tree">🎄</div>
      
      <h1 class="greeting">
        <span class="greeting-icon">🎅</span>
        圣诞愿望清单
        <span class="greeting-icon">🎁</span>
      </h1>
      
      <p class="message">
        在这个特别的日子里<br>
        记录下你的2025年目标
      </p>
      
      <!-- 装饰元素 -->
      <div class="decorations">
        <span class="decoration">🔔</span>
        <span class="decoration">🎉</span>
        <span class="decoration">⭐</span>
      </div>
      
      <div class="nickname-input">
        <input
          v-model="nickname"
          type="text"
          placeholder="请输入你的昵称..."
          maxlength="10"
          @keyup.enter="handleStart"
          :class="{ error: showError }"
          @input="showError = false"
        />
        <p class="error-text" v-if="showError">
          请输入昵称后继续
        </p>
      </div>
      
      <button class="create-button" @click="handleStart">
        <span class="gift-icon">✨</span>
        <span class="gift-text">开始创建</span>
        <span class="gift-icon">✨</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()
const nickname = ref('')
const showError = ref(false)

const handleStart = () => {
  if (!nickname.value.trim()) {
    showError.value = true
    return
  }
  userStore.setNickname(nickname.value.trim())
  router.push('/result')
}
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a2a6c 0%, #2c3e50 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

// 雪花动画
.snowflakes {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
}

.snowflake {
  position: absolute;
  color: #fff;
  font-size: 1.5em;
  animation: snowfall linear infinite;
  
  @for $i from 1 through 12 {
    &:nth-child(#{$i}) {
      left: percentage(random(100) / 100);
      animation-duration: #{5 + random(10)}s;
      animation-delay: #{-random(10)}s;
    }
  }
}

@keyframes snowfall {
  0% {
    transform: translateY(-100%) rotate(0deg);
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
  }
}

.content {
  text-align: center;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  margin: 2rem;
  position: relative;
  z-index: 2;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
}

.christmas-tree {
  font-size: 5rem;
  margin-bottom: 2rem;
  animation: glow 2s ease-in-out infinite alternate;
}

.greeting {
  font-size: 3rem;
  color: #ffd700;
  margin-bottom: 1rem;
  font-family: "Microsoft YaHei", serif;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  
  .greeting-icon {
    font-size: 2.5rem;
    animation: bounce 2s infinite;
  }
}

.message {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 3rem;
  line-height: 1.8;
}

.decorations {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  
  .decoration {
    font-size: 2rem;
    animation: swing 3s ease-in-out infinite;
    
    &:nth-child(2) {
      animation-delay: -0.6s;
    }
    &:nth-child(3) {
      animation-delay: -1.2s;
    }
  }
}

.create-button {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2.5rem;
  background: rgba(255, 215, 0, 0.15);
  border: 2px solid #ffd700;
  border-radius: 50px;
  color: #ffd700;
  font-size: 1.2rem;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }
  
  &:hover {
    background: rgba(255, 215, 0, 0.25);
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(255, 215, 0, 0.3);
    
    &::before {
      left: 100%;
    }
  }
}

@keyframes glow {
  from {
    filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.5));
  }
  to {
    filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.8));
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes swing {
  0%, 100% {
    transform: rotate(-10deg);
  }
  50% {
    transform: rotate(10deg);
  }
}

@media (max-width: 768px) {
  .content {
    padding: 2rem;
    margin: 1rem;
  }

  .christmas-tree {
    font-size: 4rem;
  }

  .greeting {
    font-size: 2rem;
    
    .greeting-icon {
      font-size: 1.8rem;
    }
  }
  
  .message {
    font-size: 1.2rem;
  }
  
  .decorations {
    gap: 1.5rem;
    
    .decoration {
      font-size: 1.5rem;
    }
  }
}

.nickname-input {
  margin: 2rem 0;
  text-align: center;
  
  input {
    width: 240px;
    padding: 1rem 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 215, 0, 0.3);
    border-radius: 50px;
    color: white;
    font-size: 1.1rem;
    text-align: center;
    transition: all 0.3s ease;
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
    
    &:focus {
      outline: none;
      border-color: #ffd700;
      background: rgba(255, 255, 255, 0.15);
      box-shadow: 0 0 20px rgba(255, 215, 0, 0.2);
    }
    
    &.error {
      border-color: rgba(255, 99, 71, 0.5);
      animation: shake 0.5s;
    }
  }
  
  .error-text {
    color: rgba(255, 99, 71, 0.9);
    font-size: 0.9rem;
    margin-top: 0.5rem;
    animation: fadeIn 0.3s;
  }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style> 