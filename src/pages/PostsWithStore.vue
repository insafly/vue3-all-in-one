<template>
  <div>
    <div class="app__header">
      <h1>Page with posts</h1>
      <AppInput
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
        placeholder="Search..."
        v-focus
      />
      <div class="app__btns">
        <AppBtn @click="showDialog">Create post</AppBtn>
        <AppSelect
          :options="sortOptions"
          :model-value="selectedSort"
          @update:model-value="setSelectedSort"
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
    <div
      class="observer"
      v-intersection="{ loadMorePosts, page, totalPages }"
      :class="{ 'hidden': page > totalPages }"
    />
  </div>
</template>

<script>
import PostList from '@/components/PostList';
import PostForm from '@/components/PostForm';
// import axios from 'axios';
import { mapState, mapGetters, mapMutations, mapActions  } from 'vuex';


export default {
  components: { PostList, PostForm },
  data() {
    return {
      isDialogVisible: false,
    };
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostsLoading: state => state.post.isPostsLoading,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
      selectedSort: state => state.post.selectedSort,
      sortOptions: state => state.post.sortOptions,
      searchQuery: state => state.post.searchQuery,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',
    }),
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort',
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts : 'post/fetchPosts',
    }),
    addPostHandler(post) {
      this.posts.push(post);
    },
    removePostHandler(id) {
      this.posts = this.posts.filter(el => el.id !== id);
    },
    showDialog() {
      this.isDialogVisible = true;
    },
  },
  mounted() {
    // console.log(this.$store.state.post.limit)
    // this.$store.commit('user/setLoading', true);
    this.fetchPosts();
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