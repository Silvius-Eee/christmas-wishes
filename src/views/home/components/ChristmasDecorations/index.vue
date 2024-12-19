<template>
  <div class="decorations-container">
    <!-- 圣诞树与法律书籍 -->
    <div class="christmas-tree">
      <div class="star">⭐</div>
      <div class="tree">🎄</div>
      <div class="legal-books">
        <span>📚</span>
        <span>⚖️</span>
        <span>📜</span>
      </div>
    </div>
    
    <!-- 圣诞老人与法槌 -->
    <div class="santa">
      <div class="gavel">🔨</div>
      <div class="santa-figure">🎅</div>
    </div>
    
    <!-- 装饰品 -->
    <div class="decorations">
      <span class="bell">🔔</span>
      <span class="scale">⚖️</span>
      <span class="scroll">📜</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.decorations-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 1;
}

.christmas-tree {
  position: absolute;
  left: 10%;
  bottom: 10%;
  text-align: center;
  
  .star {
    font-size: 3rem;
    animation: twinkle 1.5s infinite alternate;
  }
  
  .tree {
    font-size: 8rem;
    animation: sway 3s ease-in-out infinite;
  }
  
  .legal-books {
    display: flex;
    gap: 1rem;
    justify-content: center;
    font-size: 2.5rem;
    margin-top: 1rem;
    
    span {
      animation: bounce 2s infinite;
      
      &:nth-child(2) {
        animation-delay: 0.3s;
      }
      &:nth-child(3) {
        animation-delay: 0.6s;
      }
    }
  }
}

.santa {
  position: absolute;
  right: 10%;
  bottom: 20%;
  text-align: center;
  
  .gavel {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    animation: swing 2s infinite;
  }
  
  .santa-figure {
    font-size: 6rem;
    animation: float 3s ease-in-out infinite;
  }
}

.decorations {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 3rem;
  
  span {
    font-size: 3rem;
    animation: rotate 3s infinite alternate;
    
    &:nth-child(2) {
      animation-delay: 0.5s;
    }
    &:nth-child(3) {
      animation-delay: 1s;
    }
  }
}

@keyframes twinkle {
  0% { opacity: 0.5; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1.1); }
}

@keyframes sway {
  0%, 100% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-30px); }
}

@keyframes rotate {
  0% { transform: rotate(-15deg); }
  100% { transform: rotate(15deg); }
}

@keyframes swing {
  0%, 100% { transform: rotate(-20deg); }
  50% { transform: rotate(20deg); }
}

@media (max-width: 768px) {
  .christmas-tree {
    .tree {
      font-size: 6rem;
    }
    .legal-books span {
      font-size: 2rem;
    }
  }
  
  .santa .santa-figure {
    font-size: 4rem;
  }
  
  .decorations span {
    font-size: 2rem;
  }
}
</style> 