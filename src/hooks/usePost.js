import axios from 'axios';
import { ref, onMounted } from 'vue';

const usePosts = function(limit) {
  const posts = ref([]);
  const totalPages = ref(0);
  const isPostsLoading = ref(true);
  const fetching = async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts`,
        {
          params: {
            _page: 1,
            _limit: limit,
          },
        }
      );
      totalPages.value = Math.ceil(response.headers['x-total-count'] / limit);
      posts.value = response.data;
    } catch (e) {
      console.error(e);
    } finally {
      isPostsLoading.value = false;
    }
  }

  onMounted(fetching);
  // onCreated()
  // computed()
  // watch()

  return {
    posts, totalPages, isPostsLoading,
  };
};

export default usePosts;
