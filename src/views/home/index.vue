<template>
  <div class="flex flex-col h-full">
    <div class="flex-1 h-full overflow-hidden bg_f2f4f6">
      <router-view />
    </div>
    <van-tabbar v-model="activeTab" :fixed="false" :border="true" route>
      <van-tabbar-item to="/message" icon="home-o">消息</van-tabbar-item>
      <van-tabbar-item to="/email" icon="search">邮件</van-tabbar-item>
      <van-tabbar-item to="/work" icon="friends-o">工作台</van-tabbar-item>
      <van-tabbar-item to="/document" icon="setting-o">文档</van-tabbar-item>
      <van-tabbar-item to="/book" icon="setting-o">通讯录</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  // import { useUserStore } from '@/store/modules/user';
  // const userStore = useUserStore();

  const activeTab = ref(0);

  // const { token, userInfo } = userStore;
</script>

<style lang="scss" scoped>
  .bg_f2f4f6 {
    background-color: #f2f4f6;
  }
  .van-tabbar-item--active {
    color: #4eabb3;
  }
</style>
