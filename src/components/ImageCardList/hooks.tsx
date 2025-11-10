import { ref, computed } from 'vue';

export interface ImageCard {
  id: string | number;
  imageUrl: string;
  title: string;
  description?: string;
}

export interface UseImageCardListProps {
  cards: ImageCard[];
  imageHeight?: string;
}

export const useImageCardList = (props: UseImageCardListProps) => {
  // 使用响应式数据
  const cardsRef = ref(props.cards);
  const imageHeightRef = ref(props.imageHeight || '200px');
  
  // 计算属性
  const computedCards = computed(() => cardsRef.value);
  const computedImageHeight = computed(() => imageHeightRef.value);
  
  // 返回需要在模板中使用的数据
  return {
    cards: computedCards,
    imageHeight: computedImageHeight
  };
};