<template>
  <div>
    <h3>room</h3>
    <button @click="jumpHomePage">to home</button>
    <button @click="getWinInfo">获取窗口消息</button>
    <button @click="hideWin">隐藏窗口</button>
    <button @click="getAllWin">获取所有窗口</button>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { ipcRenderer } from 'electron';
  import { hide } from '@/utils/electron-api';
  const router = useRouter();

  onMounted(() => {
    console.log('hello .....');
  });

  const jumpHomePage = () => {
    router.push('/');
  };
  const getWinInfo = () => {
    const windowInfo = ipcRenderer.sendSync('get-window-info');
    console.log(windowInfo);
  };
  const hideWin = () => {
    hide();
  };
  const getAllWin = () => {
    const win_list = ipcRenderer.sendSync('get-all-win');
    console.log(win_list);
  };
</script>

<style></style>
