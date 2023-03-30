<template>
  <div>
    <h3>room</h3>
    <button @click="jumpHomePage">to home</button>
    <button @click="getWinInfoEvent">获取窗口消息</button>
    <button @click="hideWin">隐藏窗口</button>
    <button @click="getAllWinEvent">获取所有窗口</button>
    <button @click="testContext">测试上下文</button>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { hide, getWindowInfo, getAllWin } from '@/utils/electron-api';
  const router = useRouter();
  onMounted(() => {});

  const jumpHomePage = () => {
    router.push('/');
  };
  const getWinInfoEvent = () => {
    const windowInfo = getWindowInfo();
    console.log(windowInfo);
  };
  const hideWin = () => {
    hide();
  };
  const getAllWinEvent = () => {
    const win_list = getAllWin();
    console.log(win_list);
  };
  const testContext = () => {
    console.log(window);
  };
</script>

<style></style>
