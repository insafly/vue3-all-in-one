<template>
  <div class="post">
    <div>
      <div><strong>Title:</strong> {{ post.title }} ({{ post.id }})</div>
      <div><strong>Description:</strong> {{ post.body }}</div>
    </div>
    <div class="post__buttons">
      <AppBtn @click="$router.push(`/posts/${ post.id }`)">Open</AppBtn>
      <AppBtn @click="$emit('remove', post.id)">Remove</AppBtn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped lang="scss">
.post{
  padding: 15px;
  border: 2px solid #999;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__buttons {
    margin-left: 20px;
    display: flex;

    .btn + .btn {
      margin-left: 15px;
    }
  }
} 
</style>
