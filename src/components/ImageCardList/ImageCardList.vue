<script setup lang="ts">
import { useImageCardList } from './hooks';

interface ImageCard {
  id: string | number
  imageUrl: string
  title: string
  description?: string
}

interface Props {
  cards: ImageCard[]
  imageHeight?: string
}

const props = withDefaults(defineProps<Props>(), {
  cards: () => [],
  imageHeight: '200px'
})

// 使用现代的 emit 定义方式
const emit = defineEmits<{
  cardClick: [card: ImageCard]
}>()

const { cards, imageHeight } = useImageCardList(props);
</script>

<template>
  <div class="image-card-list">
    <div 
      v-for="card in cards" 
      :key="card.id"
      class="image-card"
      @click="emit('cardClick', card)"
    >
      <div class="image-container" :style="{ height: imageHeight }">
        <img :src="card.imageUrl" :alt="card.title" class="card-image" />
      </div>
      <div class="card-content">
        <h3 class="card-title">{{ card.title }}</h3>
        <p v-if="card.description" class="card-description">{{ card.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-card-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.image-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  background: white;
  cursor: pointer;
}

.image-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.image-container {
  width: 100%;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.image-card:hover .card-image {
  transform: scale(1.05);
}

.card-content {
  padding: 16px;
}

.card-title {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.card-description {
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.4;
}
</style>