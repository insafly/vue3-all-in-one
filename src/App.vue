<template>
  <AppNav />
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import AppNav from './components/AppNav.vue';

export default {
  components: { AppNav },
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

h1 {
  margin-bottom: 15px;
}

.app {
  padding: 30px;
  width: 100%;
  overflow: hidden;
}
</style>
