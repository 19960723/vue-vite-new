<script setup lang="ts">
  // import HelloWorld from './components/HelloWorld.vue';
  import useHeaderNav from './hooks/useHeaderNav';
  import { ref } from 'vue';
  const title = ref('首页');
  const { backLeft } = useHeaderNav();
  const onClickRight = () => {};
</script>

<template>
  <div>
    <!-- <HeaderCom title="首页" /> -->
    <van-nav-bar :title="title" left-arrow @click-left="backLeft" @click-right="onClickRight" />
    <router-view />
  </div>
  <!-- <div>
    <van-button type="primary">asd</van-button>
    <choose-area />
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" /> -->
</template>

<style scoped>
  /* .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  } */
</style>
