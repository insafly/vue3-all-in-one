<template>
  <button class="btn">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'AppBtn',
}
</script>

<style scoped  lang="scss">
.btn {
  border: 2px solid #000;
  background: #000;
  color: #fff;
  padding: 10px 15px;
  text-align: center;
  cursor: pointer;
  align-self: flex-end;
  transition: all 0.3s linear;

  &:hover {
    background: #fff;
    color: #000;
  }

  &.w-100 {
    width: 100%;
  }
}

</style>