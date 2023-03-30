<!-- 空白页面 给新窗口预加载页面  -->
<template>
  <div></div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { hide } from '@/utils/electron-api';

  defineOptions({
    beforeRouteEnter(_to, _from, next) {
      next();
      // hide();
    },
  });

  onMounted(() => {
    // hide();
  });
</script>

<style></style>
