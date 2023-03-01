<template>
  <div class="flex flex-col h-full">
    <!-- home
    {{ token }}== {{ userInfo }} -->
    <div class="flex-1 h-full overflow-y-auto">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="item in list" :key="item" :title="item" />
      </van-list>
    </div>
    <van-tabbar v-model="activeTab" :fixed="false" :border="true">
      <van-tabbar-item icon="home-o">消息</van-tabbar-item>
      <van-tabbar-item icon="search">邮件</van-tabbar-item>
      <van-tabbar-item icon="friends-o">工作台</van-tabbar-item>
      <van-tabbar-item icon="setting-o">文档</van-tabbar-item>
      <van-tabbar-item icon="setting-o">通讯录</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useUserStore } from '@/store/modules/user';
  const userStore = useUserStore();

  const activeTab = ref(0);
  const list = ref([]);
  const loading = ref(false);
  const finished = ref(false);

  const { token, userInfo } = userStore;
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

<style lang="scss" scoped>
  .van-tabbar-item--active {
    color: #4eabb3;
  }
</style>
