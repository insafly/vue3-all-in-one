<template>
  <form @submit.prevent>
    <h3>Add new post:</h3>
    <AppInput placeholder="Title" v-model="post.title" v-focus />
    <!-- v-model:value="post.title" -->
    <AppInput placeholder="Body" v-model="post.body" />
    <!-- <input type="text" class="form-input" placeholder="Title" >
    <input type="text" class="form-input" placeholder="Body" >-->
    <AppBtn @click="addPost" class="w-100">Add</AppBtn>
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: "",
        body: ""
      }
    };
  },
  watch: {
    post: {
      deep: true,
      handler(newVal) {
        console.log(newVal);
      },
    },
  },
  methods: {
    addPost() {
      this.post.id = Date.now();
      this.$emit("addPost", { ...this.post });
      this.post.title = "";
      this.post.body = "";
    }
  }
};
</script>

<style scoped lang="scss">
form {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  h3 {
    margin: 0 0 20px;
  }

  .btn {
    width: 100% !important;
  }
}
</style>
