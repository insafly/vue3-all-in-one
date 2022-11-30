import { ref, computed } from 'vue';

export default function useSortedAndSearchedPosts(sortedPosts) {
  const searchQuery = ref('');
  const sortedAndSearchedPosts = computed(() => sortedPosts.value.filter(post => post.title.toLowerCase().trim().includes(searchQuery.value.toLowerCase().trim())));

  return { searchQuery, sortedAndSearchedPosts };
};
