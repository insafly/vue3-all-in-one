<template>
  <nav class="nav">
    <strong class="logo" @click="goTo('/')">Logo</strong>
    <div class="nav__bar">
      <AppBtn
        v-for="r in routes"
        :key="r.title"
        @click="goTo(r.route)">{{ r.title }}</AppBtn>
    </div>
  </nav>
</template>

<script>
export default {
  name: "AppNav",
  data() {
    return {
      routes: [
        {
          route: '/posts',
          title: 'Posts',
        },
        {
          route: '/about',
          title: 'About',
        },
        {
          route: '/store',
          title: 'Store',
        },
        {
          route: '/composition',
          title: 'Composition',
        },
      ],
    };
  },
  methods: {
    goTo(route) {
      this.$router.push(route);
    },
  },
}
</script>

<style lang="scss" scoped>
.nav {
  border: 1px solid black;
  padding: 20px; 
  margin-bottom: 15px;
  align-items: center;
  display: flex;
  box-shadow: 2px 2px 4px #999;

  &__bar {
    margin-left: auto;
  }

  .logo {
    cursor: pointer;

    &.active {
      pointer-events: none;
    }
  }

  .btn {
    margin-left: 15px;
  }
}
</style>
