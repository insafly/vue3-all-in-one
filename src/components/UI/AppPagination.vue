<template>
  <div class="page__wrapper">
    <div
      v-for="page in total"
      :key="page"
      class="page"
      :class="{'current-page': page === current }"
      @click="changePage(page)"
    >
      {{ page }}
    </div>
  </div>
</template>

<script>
export default {
  name: "AppPagination",
  props: {
    total: Number,
    current: Number,
  },
  methods: {
    changePage(page) {
      this.$emit('changePage', page);
    },
  },
};
</script>

<style scoped>
.page__wrapper {
  display: flex;
  margin-top: 15px;
  justify-content: center;
}

.page {
  border: 1px solid #999;
  padding: 10px;
  cursor: pointer;
  margin: 0 10px;
}
.current-page {
  border: 1px solid white;
  pointer-events: none;
}
</style>