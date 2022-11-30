<template>
  <div>
    <div class="app__header">
      <h1>Page with posts</h1>
      <AppInput
        v-model.trim="searchQuery"
        placeholder="Search..."
        v-focus
      />
      <div class="app__btns">
        <AppBtn @click="showDialog">Create post</AppBtn>
        <AppSelect
          :options="sortOptions"
          v-model="selectedSort"
        />
      </div>
    </div>
    <AppDialog v-model:show="isDialogVisible">
      <PostForm @addPost="addPostHandler" />
    </AppDialog>
    <PostList
      v-if="!isPostsLoading"
      @remove="removePostHandler"
      :posts="sortedAndSearchedPosts"
    />
    <div v-else>Loading...</div>

    <!-- ref="observer" -->
    <div
      class="observer"
      v-intersection="{ loadMorePosts, page, totalPages }"
      :class="{ 'hidden': page > totalPages }"
    />
    <!-- <AppPagination
      :total="totalPages"
      :current="page"
      @changePage="changePage"
    /> -->
  </div>
</template>

<script>
import PostList from '@/components/PostList';
import PostForm from '@/components/PostForm';
import axios from 'axios';

export default {
  components: { PostList, PostForm },
  data() {
    return {
      posts: [],
      isDialogVisible: false,
      isPostsLoading: false,
      page: 1,
      limit: 10,
      totalPages: 0,
      selectedSort: '',
      sortOptions: [
        { value: 'title', name: 'Sort by title' },
        { value: 'body', name: 'Sort by body' },
      ],
      searchQuery: '',
    };
  },
  // watch: {
  //   page() {
  //     this.fetchPosts();
  //   },
  // },
  // way 1 to sort
  // watch: {
  //   selectedSort(newValue) {
  //     this.posts.sort((post1, post2) => {
  //       // return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]);
  //       return post1[newValue]?.localeCompare(post2[newValue]);
  //     });
  //   },
  // },
  // way 2 to sort 
  computed: {
    sortedPosts() {
      const { selectedSort } = this;
      // without mutation of base post array
      return [...this.posts].sort((post1, post2) => post1[selectedSort]?.localeCompare(post2[selectedSort]));
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().trim().includes(this.searchQuery.toLowerCase().trim()));
    },
  },
  methods: {
    // changePage(num) {
    //   this.page = num;
    //   // this.fetchPosts();
    // },
    addPostHandler(post) {
      this.posts.push(post);
    },
    removePostHandler(id) {
      this.posts = this.posts.filter(el => el.id !== id);
    },
    showDialog() {
      this.isDialogVisible = true;
    },
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts`,
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = response.data;
      } catch (e) {
        console.error(e);
      } finally {
        this.isPostsLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts`,
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = [ ...this.posts, ...response.data ];
      } catch (e) {
        console.error(e);
      }
    },
  },
  mounted() {
    this.fetchPosts();
    
    // const opts = {
    //   rootMargin: '0px',
    //   threshold: 1.0
    // };

    // const callback = (entries, observer) => {
    //   if (entries[0].isIntersecting && this.page <= this.totalPages) {
    //     this.loadMorePosts();
    //   }
    // };

    // const observer = new IntersectionObserver(callback, opts);
    // observer.observe(this.$refs.observer)
  },
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