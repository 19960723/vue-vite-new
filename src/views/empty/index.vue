<!-- 空白页面 给新窗口预加载页面  -->
<template>
  <div></div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { ipcRenderer } from 'electron';

  defineOptions({
    beforeRouteEnter(_to, _from, next) {
      next();
      // ipcRenderer.send('hide-win');
    },
  });

  onMounted(() => {
    // ipcRenderer.send('hide-win');
  });
</script>

<style></style>
