<template>
  <input
    :type="type"
    class="form-input"
    @input="updateInput"
    :value="modelValue"
  >
</template>

<script>
export default {
  name: 'AppInput',
  props: {
    type: {
      type: String,
      default: 'text',
    },
    modelValue: [String, Number],
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value);
    },
  },
}
</script>

<style scoped lang="scss">
.form-input {
  padding: 10px 15px;
  border: 2px solid #999;
  width: 100%;
  margin-bottom: 10px;
  color: #000;

  &::placeholder {
    color: #ccc;
    opacity: 1;
  }

  &::-ms-input-placeholder {
    color: #ccc;
  }
}
</style>