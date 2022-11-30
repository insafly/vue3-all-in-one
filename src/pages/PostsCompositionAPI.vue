<template>
  <div>
    <div class="app__header">
      <h1>Page with posts</h1>
      <AppInput
        v-model="searchQuery"
        placeholder="Search..."
        v-focus
      />
      <div class="app__btns">
        <AppSelect
          :options="sortOptions"
          v-model="selectedSort"
        />
      </div>
    </div>
    <PostList
      v-if="!isPostsLoading"
      :posts="sortedAndSearchedPosts"
    />
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import PostList from '@/components/PostList';
import PostForm from '@/components/PostForm';

// import { ref } from 'vue';

import usePost from '@/hooks/usePost';
import useSortedPosts from '@/hooks/useSortedPosts';
import useSortedAndSearchedPosts from '@/hooks/useSortedAndSearchedPosts';

export default {
  components: { PostList, PostForm },
  data() {
    return {
      isDialogVisible: false,
      // page: 1,
      sortOptions: [
        { value: 'title', name: 'Sort by title' },
        { value: 'body', name: 'Sort by body' },
      ],
      // searchQuery: '',
    };
  },
  setup(props) {
    const { posts, totalPages, isPostsLoading } = usePost(10);
    const { selectedSort, sortedPosts } = useSortedPosts(posts);
    const { searchQuery, sortedAndSearchedPosts } = useSortedAndSearchedPosts(sortedPosts);
    
    return {
      posts, totalPages, isPostsLoading,
      selectedSort, sortedPosts,
      searchQuery, sortedAndSearchedPosts,
    }
  },
  
  // way 2 to sort 
  //  
  // methods: {
  //   // changePage(num) {
  //   //   this.page = num;
  //   //   // this.fetchPosts();
  //   // },
  //   addPostHandler(post) {
  //     this.posts.push(post);
  //   },
  //   removePostHandler(id) {
  //     this.posts = this.posts.filter(el => el.id !== id);
  //   },
  //   showDialog() {
  //     this.isDialogVisible = true;
  //   },
    
  //   async loadMorePosts() {
  //     try {
  //       this.page += 1;
  //       const response = await axios.get(
  //         `https://jsonplaceholder.typicode.com/posts`,
  //         {
  //           params: {
  //             _page: this.page,
  //             _limit: this.limit,
  //           },
  //         }
  //       );
  //       this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
  //       this.posts = [ ...this.posts, ...response.data ];
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   },
  // },
  // mounted() {
  //   this.fetchPosts();
    
  //   // const opts = {
  //   //   rootMargin: '0px',
  //   //   threshold: 1.0
  //   // };

  //   // const callback = (entries, observer) => {
  //   //   if (entries[0].isIntersecting && this.page <= this.totalPages) {
  //   //     this.loadMorePosts();
  //   //   }
  //   // };

  //   // const observer = new IntersectionObserver(callback, opts);
  //   // observer.observe(this.$refs.observer)
  // },
};
</script>

<style lang="scss">
.app {
  &__header {
    margin-bottom: 20px;
  }

  &__btns {
    display: flex;
    justify-content: space-between;

    .btn {
      width: auto !important;
    }
  }
}

.observer {
  height: 50vh;

  &.hidden {
    height: 0;
  }
}
</style>