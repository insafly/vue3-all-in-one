<template>
  <div
    class="dialog"
    v-if="show"
    @click.stop="hideDialog"
  >
    <div
      class="dialog__content"
      @click.stop
    >
      <slot />
    </div>
  </div>
</template>

<script>
import toggleMixin from '@/mixins/toggleMixin';

export default {
  name: 'AppDialog',
  mixins: [ toggleMixin ],
  // props: {
  //   show: {
  //     type: Boolean,
  //     default: false,
  //   }
  // },
  // methods: {
  //   hideDialog() {
  //     this.$emit('update:show', false);
  //   },
  // },
  mounted() {
    // console.log('mounted')
  },
}
</script>

<style scoped lang="scss">
.dialog{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;

  &__content {
    background: #fff;
    border-radius: 12px;
    margin: auto;
    min-width: 300px;
    min-height: 50px;
    padding: 20px;
  }
}
</style>