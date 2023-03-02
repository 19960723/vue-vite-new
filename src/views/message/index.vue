<template>
  <div class="h-full overflow-auto">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  const list = ref<any[]>([]);
  const loading = ref(false);
  const finished = ref(false);
  const onLoad = () => {
    setTimeout(() => {
      for (let i = 0; i < 20; i++) {
        list.value.push(list.value.length + 1);
      }
      // 加载状态结束
      loading.value = false;
      // 数据全部加载完成
      if (list.value.length >= 100) {
        finished.value = true;
      }
    }, 1000);
  };
</script>

<style></style>
