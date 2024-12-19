<script setup lang="ts">
import { ref } from 'vue'

interface Goal {
  id: number
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  milestones: string[]
}

// 提供维度框架
const dimensions = [
  {
    id: 1,
    title: '个人成长',
    description: '关于自我提升的目标',
    icon: '🌱'
  },
  {
    id: 2,
    title: '事业发展',
    description: '关于职业规划的目标',
    icon: '💼'
  },
  {
    id: 3,
    title: '家庭关系',
    description: '关于亲情友情的目标',
    icon: '❤️'
  },
  {
    id: 4,
    title: '生活品质',
    description: '关于生活方式的目标',
    icon: '✨'
  }
]

// 示例目标结构
const coreGoal = ref({
  title: '[在此输入您的核心目标]',
  description: '[在此描述您的愿景]',
  milestones: [
    '[第一个重要节点]',
    '[第二个重要节点]',
    '[第三个重要节点]',
    '[第四个重要节点]'
  ]
})

const subGoals = ref<Goal[]>(dimensions.map(dim => ({
  id: dim.id,
  title: dim.title,
  description: dim.description,
  priority: 'medium',
  milestones: [
    '[目标1]',
    '[目标2]',
    '[目标3]',
    '[目标4]'
  ]
})))
</script>

<template>
  <div class="wish-content">
    <div class="decoration">✨</div>
    
    <!-- 核心目标区域 -->
    <section class="core-goal slide-in">
      <h2 class="goal-title">2025年度目标</h2>
      <div class="goal-input">
        <input 
          v-model="coreGoal.title"
          placeholder="输入您的核心目标"
          class="title-input"
        />
        <textarea 
          v-model="coreGoal.description"
          placeholder="描述您的愿景"
          class="description-input"
        />
      </div>
      
      <!-- 关键节点 -->
      <div class="milestones">
        <h3>关键节点</h3>
        <ul>
          <li v-for="(milestone, index) in coreGoal.milestones" 
              :key="index"
              class="fade-in milestone-input"
              :style="{ animationDelay: `${index * 0.2}s` }">
            <input 
              v-model="coreGoal.milestones[index]"
              :placeholder="`节点 ${index + 1}`"
            />
          </li>
        </ul>
      </div>
    </section>
    
    <!-- 分维度目标 -->
    <section class="sub-goals">
      <h3>目标维度</h3>
      <div class="goals-grid">
        <div v-for="(goal, index) in subGoals" 
             :key="goal.id"
             class="goal-card scale-in"
             :class="[`priority-${goal.priority}`]">
          <div class="card-header">
            <span class="dimension-icon">{{ dimensions[index].icon }}</span>
            <h4>{{ goal.title }}</h4>
          </div>
          <textarea 
            v-model="goal.description"
            :placeholder="`记录您在${goal.title}方面的目标`"
            class="goal-input"
          />
          <ul class="milestone-list">
            <li v-for="(milestone, mIndex) in goal.milestones" 
                :key="mIndex">
              <input 
                v-model="goal.milestones[mIndex]"
                :placeholder="`具体目标 ${mIndex + 1}`"
              />
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import '../../styles/theme.scss';
@import '../../styles/animation.scss';

.wish-content {
  position: relative;
  padding: $spacing-large;
  
  .decoration {
    position: absolute;
    top: -20px;
    right: -20px;
    font-size: 4rem;
    opacity: 0.3;
    animation: twinkle 2s infinite alternate;
  }
}

.core-goal {
  text-align: center;
  margin-bottom: $spacing-large;
  
  .goal-title {
    font-family: $font-title;
    font-size: 2.5rem;
    color: $primary-gold;
    margin-bottom: $spacing-medium;
    text-shadow: 0 0 10px rgba($primary-gold, 0.3);
  }
  
  .goal-description {
    font-size: 1.2rem;
    color: rgba(white, 0.9);
    margin-bottom: $spacing-large;
  }
}

.milestones {
  max-width: 600px;
  margin: 0 auto;
  
  h3 {
    color: $secondary-silver;
    margin-bottom: $spacing-medium;
  }
  
  ul {
    list-style: none;
    padding: 0;
    
    li {
      margin: $spacing-small 0;
      padding: $spacing-small;
      background: rgba(white, 0.1);
      border-radius: 8px;
      
      &:hover {
        background: rgba(white, 0.15);
        transform: translateX(5px);
        transition: all $animation-duration ease;
      }
    }
  }
}

.sub-goals {
  h3 {
    text-align: center;
    color: $secondary-silver;
    margin-bottom: $spacing-medium;
  }
  
  .goals-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: $spacing-medium;
  }
  
  .goal-card {
    padding: $spacing-medium;
    background: rgba(white, 0.05);
    border-radius: 12px;
    border: 1px solid rgba(white, 0.1);
    
    h4 {
      color: $primary-gold;
      margin-bottom: $spacing-small;
    }
    
    &.priority-high {
      border-left: 3px solid #ff6b6b; // 温暖的红色
    }
    
    &.priority-medium {
      border-left: 3px solid #4ecdc4; // 清新的青色
    }
    
    &.priority-low {
      border-left: 3px solid #95a5a6; // 柔和的灰色
    }
    
    &:hover {
      transform: translateY(-5px);
      transition: transform 0.3s ease;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    
    .milestone-list {
      margin-top: $spacing-small;
      padding-left: $spacing-medium;
      
      li {
        margin: calc($spacing-small / 2) 0;
        font-size: 0.9rem;
        opacity: 0.8;
      }
    }
  }
}

// 响应式适配
@media (max-width: $breakpoint-mobile) {
  .wish-content {
    padding: $spacing-medium;
  }
  
  .core-goal {
    .goal-title {
      font-size: 2rem;
    }
  }
  
  .goals-grid {
    grid-template-columns: 1fr;
  }
}

@keyframes twinkle {
  from {
    opacity: 0.3;
    transform: scale(1);
  }
  to {
    opacity: 0.6;
    transform: scale(1.2);
  }
}

// 添加输入框样式
.goal-input {
  width: 100%;
  margin: $spacing-medium 0;
  
  input, textarea {
    width: 100%;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    padding: $spacing-small;
    color: white;
    font-family: $font-content;
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
    
    &:focus {
      outline: none;
      border-color: $primary-gold;
      background: rgba(255, 255, 255, 0.15);
    }
  }
  
  textarea {
    min-height: 100px;
    resize: vertical;
  }
}

.card-header {
  display: flex;
  align-items: center;
  gap: $spacing-small;
  margin-bottom: $spacing-small;
  
  .dimension-icon {
    font-size: 1.5rem;
  }
}

.milestone-input {
  input {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    padding: $spacing-small 0;
    color: white;
    
    &:focus {
      outline: none;
      border-bottom-color: $primary-gold;
    }
  }
}

// 优化卡片样式
.goal-card {
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
}
</style> 