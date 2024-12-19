<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useWishStore } from '@/stores/wish'
import WishCard from './components/WishCard/index.vue'

const router = useRouter()
const userStore = useUserStore()
const wishStore = useWishStore()

interface Goal {
  id: number
  content: string
}

const yearGoals = ref<Goal[]>([
  { id: 1, content: '' },
  { id: 2, content: '' },
  { id: 3, content: '' }
])

const blessing = ref('')

// 添加保存相关的状态
const isSaving = ref(false)
const showSaveSuccess = ref(false)

// 恢复保存条件
const canSave = computed(() => {
  return yearGoals.value.some(goal => goal.content.trim()) || blessing.value.trim()
})

// 保存功能
const handleSave = () => {
  console.log('Save button clicked')
  
  // 过滤掉空的愿望
  const validGoals = yearGoals.value.filter(goal => goal.content.trim())
  
  if (!validGoals.length && !blessing.value.trim()) {
    console.log('No content to save')
    return
  }
  
  isSaving.value = true
  
  setTimeout(() => {
    try {
      // 保存数据到 store
      wishStore.saveWish({
        goals: validGoals,
        blessing: blessing.value.trim()
      })
      
      // 保存数据到 localStorage
      const savedData = {
        goals: validGoals,
        blessing: blessing.value.trim(),
        date: new Date().toISOString(),
        nickname: userStore.nickname
      }
      localStorage.setItem('wishCard', JSON.stringify(savedData))
      
      // 跳转到保存页面
      router.push('/saved')
    } catch (error) {
      console.error('Save error:', error)
    } finally {
      isSaving.value = false
    }
  }, 1500)
}

// 关闭卡片
const handleCloseCard = () => {
  console.log('Closing wish card')
  showWishCard.value = false
}

// 使用计算属性生成寄语
const zhetiMessage = computed(() => `
亲爱的${userStore.nickname}：

在这个飘着雪花的圣诞季节，
很高兴能在这里遇见你。

2025年的愿望清单，
不仅是我们对未来的期许，
更是对自己的一份承诺。

愿你在追逐梦想的路上，
永远保持那份温暖的初心。
记得在前行的路上，
偶尔停下脚步，
感受生活中的每一份美好。

择堤在这里，
愿你的故事，
如繁星般闪耀。
`)

// 添加卡片显示状态
const showWishCard = ref(false)
</script>

<template>
  <div class="result-page">
    <!-- 优化雪花背景 -->
    <div class="snowflakes" aria-hidden="true">
      <div v-for="n in 50" :key="n" class="snowflake">
        {{ ['❅', '❆', '❄', '✧', '✦'][n % 5] }}
      </div>
    </div>
    
    <!-- 圣诞装饰 -->
    <div class="christmas-decorations">
      <div class="decoration left">
        <div class="tree">🎄</div>
        <div class="gifts">
          <span>🎁</span>
          <span>🎁</span>
        </div>
      </div>
      <div class="decoration right">
        <div class="santa">🎅</div>
        <div class="deer">🦌</div>
      </div>
    </div>
    
    <div class="content">
      <!-- 年份标题 -->
      <div class="year-header">
        <div class="star">⭐</div>
        <h1>2025</h1>
        <div class="countdown">
          <span class="countdown-number">365</span>
          <span class="countdown-text">天的美好期待</span>
        </div>
      </div>
      
      <div class="main-content">
        <!-- 择堤寄语 -->
        <section class="message-section">
          <h2>
            <span class="title-decor">🎄</span>
            择堤寄语
            <span class="title-decor">🎄</span>
          </h2>
          <pre class="zheti-message">{{ zhetiMessage }}</pre>
          <div class="corner-decor top-left">🎀</div>
          <div class="corner-decor top-right">🔔</div>
          <div class="corner-decor bottom-left">⭐</div>
          <div class="corner-decor bottom-right">🎀</div>
        </section>
        
        <!-- 新年愿望 -->
        <section class="goals-section">
          <h2>
            <span class="title-decor">🎁</span>
            新年愿望
            <span class="title-decor">🎁</span>
          </h2>
          <div class="goals-list">
            <div 
              v-for="goal in yearGoals" 
              :key="goal.id"
              class="goal-item"
            >
              <div class="goal-number">{{ goal.id }}</div>
              <input
                v-model="goal.content"
                :placeholder="`许下你的第 ${goal.id} 个愿望...`"
                type="text"
              />
            </div>
          </div>
        </section>
        
        <!-- 新年祝福 -->
        <section class="blessing-section">
          <h2>
            <span class="title-decor">✨</span>
            新年祝福
            <span class="title-decor">✨</span>
          </h2>
          <textarea
            v-model="blessing"
            placeholder="写下你想说的话..."
            rows="3"
          ></textarea>
        </section>
      </div>
      
      <!-- 调整保存按钮位置 -->
      <div class="save-area" v-if="canSave">
        <button 
          class="save-button"
          @click="handleSave"
          :disabled="isSaving"
        >
          <div class="button-content">
            <span class="save-icon">{{ isSaving ? '⏳' : '✨' }}</span>
            <span class="save-text">{{ isSaving ? '正在收藏...' : '收藏我们之间的约定' }}</span>
            <span class="save-icon">{{ isSaving ? '⏳' : '✨' }}</span>
          </div>
          <div class="button-decor">
            <span>🎄</span>
            <span>🎁</span>
          </div>
        </button>
      </div>
    </div>
    
    <!-- 添加愿望卡片组件 -->
    <WishCard
      :goals="yearGoals"
      :blessing="blessing"
      :visible="showWishCard"
      @close="handleCloseCard"
    />
  </div>
</template>

<style lang="scss" scoped>
.result-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a2a6c 0%, #2c3e50 100%);
  padding: 2rem 1rem;
  position: relative;
  overflow: hidden;
}

// 优化雪花效果
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
  position: fixed;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.2rem;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
  animation: snowfall linear infinite;
  will-change: transform;
  
  @for $i from 1 through 50 {
    &:nth-child(#{$i}) {
      $random-x: random(100);
      $random-offset: random(100);
      $random-x-end: $random-x + $random-offset;
      $random-x-end-yoyo: $random-x + ($random-offset / 2);
      $random-yoyo-time: random(100000) / 100000;
      $random-yoyo-y: $random-yoyo-time * 100;
      $random-scale: random(10000) / 10000;
      $fall-duration: random(35) + 15;
      $fall-delay: random(35) * -1;

      left: percentage($random-x / 100);
      top: -10%;
      opacity: random(10000) / 10000;
      transform: scale(0.5 + $random-scale);
      animation: snowfall-#{$i} #{$fall-duration}s #{$fall-delay}s linear infinite;

      @keyframes snowfall-#{$i} {
        #{percentage($random-yoyo-time)} {
          transform: translate(#{$random-x-end-yoyo}vw, #{$random-yoyo-y}vh) scale(0.5 + $random-scale);
        }
        to {
          transform: translate(#{$random-x-end}vw, 110vh) scale(0.5 + $random-scale);
        }
      }
    }
  }
}

.christmas-decorations {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 3;
  
  .decoration {
    position: absolute;
    
    &.left {
      left: 2rem;
      top: 50%;
      transform: translateY(-50%);
      
      .tree {
        font-size: 5rem;
        margin-bottom: 1rem;
        animation: glow 2s infinite alternate;
      }
      
      .gifts {
        display: flex;
        gap: 0.5rem;
        font-size: 2.5rem;
        animation: bounce 2s infinite alternate;
      }
    }
    
    &.right {
      right: 2rem;
      top: 50%;
      transform: translateY(-50%);
      
      .santa {
        font-size: 4rem;
        margin-bottom: 1rem;
        animation: wave 2s infinite;
      }
      
      .deer {
        font-size: 3.5rem;
        animation: bounce 2s infinite alternate;
      }
    }
  }
}

.content {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  z-index: 2;
}

.year-header {
  text-align: center;
  position: relative;
  
  .star {
    position: absolute;
    top: -2rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 2.5rem;
    animation: twinkle 1.5s infinite alternate;
  }
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

section {
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  .corner-decor {
    position: absolute;
    font-size: 1.5rem;
    
    &.top-left { top: 1rem; left: 1rem; }
    &.top-right { top: 1rem; right: 1rem; }
    &.bottom-left { bottom: 1rem; left: 1rem; }
    &.bottom-right { bottom: 1rem; right: 1rem; }
  }
}

.message-section {
  .zheti-message {
    color: rgba(255, 255, 255, 0.9);
    white-space: pre-line;
    line-height: 1.8;
    font-size: 1.1rem;
    text-shadow: 0 0 2px rgba(255, 255, 255, 0.1);
  }
}

.goals-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  .goal-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    
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
    }
    
    input {
      flex: 1;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      color: white;
      font-size: 1.1rem;
      
      &:focus {
        outline: none;
        border-color: #ffd700;
        background: rgba(255, 255, 255, 0.1);
      }
    }
  }
}

.blessing-section {
  textarea {
    width: 100%;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    color: white;
    font-size: 1.1rem;
    resize: vertical;
    min-height: 100px;
    
    &:focus {
      outline: none;
      border-color: #ffd700;
      background: rgba(255, 255, 255, 0.1);
    }
  }
}

.save-area {
  margin-top: 3rem;
  margin-bottom: 3rem;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 10;
}

.save-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 4rem;
  background: linear-gradient(
    135deg,
    rgba(255, 215, 0, 0.3) 0%,
    rgba(255, 215, 0, 0.2) 100%
  );
  border: 2px solid rgba(255, 215, 0, 0.5);
  border-radius: 50px;
  color: #ffd700;
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(255, 215, 0, 0.2);
  
  .button-content {
    display: flex;
    align-items: center;
    gap: 1rem;
    
    .save-icon {
      font-size: 1.6rem;
      filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.5));
    }
    
    .save-text {
      text-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
    }
  }
  
  .button-decor {
    display: flex;
    gap: 1rem;
    font-size: 1.2rem;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease;
  }
  
  &:hover:not(:disabled) {
    transform: translateY(-5px);
    padding: 1.8rem 4.5rem;
    background: linear-gradient(
      135deg,
      rgba(255, 215, 0, 0.4) 0%,
      rgba(255, 215, 0, 0.3) 100%
    );
    box-shadow: 
      0 10px 20px rgba(255, 215, 0, 0.3),
      0 0 30px rgba(255, 215, 0, 0.2);
    
    .button-decor {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: wait;
    
    .save-icon {
      animation: spin 1s linear infinite;
    }
  }
}

// 添加按钮动画
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

// 响应式调整
@media (max-width: 768px) {
  .save-button {
    padding: 1.2rem 3rem;
    font-size: 1.2rem;
    
    .button-content {
      gap: 0.8rem;
      
      .save-icon {
        font-size: 1.4rem;
      }
    }
    
    &:hover:not(:disabled) {
      padding: 1.4rem 3.2rem;
    }
  }
}

// 保持原有的动画和响应式样式
@keyframes glow {
  0% { filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.5)); }
  100% { filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.8)); }
}

@keyframes wave {
  0%, 100% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
}

@keyframes bounce {
  0% { transform: translateY(0); }
  100% { transform: translateY(-10px); }
}

@keyframes twinkle {
  0% { opacity: 0.5; transform: scale(0.9) translateX(-50%); }
  100% { opacity: 1; transform: scale(1.1) translateX(-50%); }
}

@media (max-width: 1024px) {
  .christmas-decorations {
    .decoration {
      &.left, &.right {
        display: none;
      }
    }
  }
}

@media (max-width: 768px) {
  .snowflake {
    font-size: 1rem;
  }
}
</style> 