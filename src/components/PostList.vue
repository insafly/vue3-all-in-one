<template>
  <div
    v-if="posts.length"
    class="post-holder"
  >
    <h3>Posts:</h3>
    <transition-group name="post-list">
      <PostItem
        v-for="post in posts"
        @remove="$emit('remove', post.id)"
        :post="post"
        :key="post.id"
      />
    </transition-group>
  </div>
  <h3 v-else>You have no posts :(</h3>
</template>

<script>
import PostItem from './PostItem.vue';

export default {
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  components: { PostItem },
}
</script>

<style scoped>
.post-list-item {
  display: inline-block;
  margin-right: 10px;
}

.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.4s ease;
}

.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}

.post-list-move {
  transition: all 0.4s ease;
}
</style>