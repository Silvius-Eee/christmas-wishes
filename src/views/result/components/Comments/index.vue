<script setup lang="ts">
import { ref } from 'vue'

interface Comment {
  id: number
  author: string
  avatar: string
  content: string
  time: string
  likes: number
}

const comments = ref<Comment[]>([])
const newComment = ref('')
const isSubmitting = ref(false)

// 提交评论
const submitComment = async () => {
  if (!newComment.value.trim()) return
  
  isSubmitting.value = true
  try {
    // TODO: 实际提交评论的逻辑
    const comment: Comment = {
      id: comments.value.length + 1,
      author: '匿名用户',
      avatar: '👤',
      content: newComment.value,
      time: new Date().toLocaleString(),
      likes: 0
    }
    comments.value.unshift(comment)
    newComment.value = ''
  } finally {
    isSubmitting.value = false
  }
}

// 点赞评论
const likeComment = (comment: Comment) => {
  comment.likes++
}
</script>

<template>
  <div class="comments-section">
    <h3>祝福留言</h3>
    
    <!-- 评论输入框 -->
    <div class="comment-input">
      <textarea 
        v-model="newComment"
        placeholder="写下你的祝福..."
        :disabled="isSubmitting"
      ></textarea>
      <button 
        @click="submitComment"
        :disabled="isSubmitting || !newComment.trim()"
        class="submit-btn"
      >
        发送
      </button>
    </div>
    
    <!-- 评论列表 -->
    <div class="comments-list">
      <div v-if="comments.length === 0" class="empty-state">
        还没有留言，快来说点什么吧~
      </div>
      
      <div 
        v-for="comment in comments" 
        :key="comment.id"
        class="comment-item"
      >
        <div class="comment-header">
          <div class="author-info">
            <span class="avatar">{{ comment.avatar }}</span>
            <span class="author-name">{{ comment.author }}</span>
          </div>
          <span class="time">{{ comment.time }}</span>
        </div>
        
        <div class="comment-content">
          {{ comment.content }}
        </div>
        
        <div class="comment-footer">
          <button 
            class="like-btn"
            @click="likeComment(comment)"
          >
            ❤️ {{ comment.likes }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../styles/theme.scss';

.comments-section {
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

.comment-input {
  margin-bottom: $spacing-large;
  
  textarea {
    width: 100%;
    min-height: 100px;
    padding: $spacing-small;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    color: white;
    resize: vertical;
    margin-bottom: $spacing-small;
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
    
    &:focus {
      outline: none;
      border-color: $primary-gold;
    }
  }
  
  .submit-btn {
    float: right;
    padding: 0.5rem 1.5rem;
    background: $primary-gold;
    border: none;
    border-radius: 20px;
    color: #1a2a6c;
    cursor: pointer;
    font-weight: bold;
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 2px 8px rgba($primary-gold, 0.4);
    }
  }
}

.comments-list {
  .empty-state {
    text-align: center;
    color: rgba(255, 255, 255, 0.5);
    padding: $spacing-large 0;
  }
}

.comment-item {
  padding: $spacing-medium;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
  
  .comment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-small;
    
    .author-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      
      .avatar {
        font-size: 1.5rem;
      }
      
      .author-name {
        color: rgba(255, 255, 255, 0.9);
      }
    }
    
    .time {
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.5);
    }
  }
  
  .comment-content {
    margin: $spacing-small 0;
    line-height: 1.5;
  }
  
  .comment-footer {
    display: flex;
    justify-content: flex-end;
    
    .like-btn {
      background: transparent;
      border: none;
      color: white;
      cursor: pointer;
      padding: 0.3rem 0.8rem;
      border-radius: 15px;
      transition: all 0.3s ease;
      
      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    }
  }
}

@media (max-width: $breakpoint-mobile) {
  .comments-section {
    padding: $spacing-small;
  }
  
  .comment-item {
    padding: $spacing-small;
  }
}
</style> 