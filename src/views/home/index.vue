<template>
  <div>
    <h3>hello</h3>
    <button type="button" @click="toJumpPage">跳转页面</button>
    <button type="button" @click="openNewWin">打开新窗口</button>
    <button type="button" @click="openWinModal">打开窗口模态框</button>
    <button type="button" @click="openPageModal">打开页面模态框</button>
    <button type="button" @click="openConfirm">打开确认框</button>
    <button type="button" @click="openMessage">消息提醒</button>
    <a href="https://electron-react-boilerplate.js.org/" target="_blank" rel="noreferrer">
      <button type="button">
        <span role="img" aria-label="books"> 📚 </span>
        Read our docs
      </button>
    </a>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { ipcRenderer } from 'electron';
  const router = useRouter();
  const toJumpPage = () => {
    router.push({
      name: 'room',
    });
  };
  const openNewWin = () => {
    ipcRenderer.invoke('open-win', 'room');
  };
  const openWinModal = () => {};
  const openPageModal = () => {};
  const openConfirm = () => {};
  const openMessage = () => {};
</script>

<style></style>
