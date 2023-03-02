<template>
  <div class="bg_f2f4f6">
    <van-nav-bar title="收件箱" left-arrow>
      <template #left>
        <span>全选</span>
      </template>
      <template #right>
        <span>完成</span>
      </template>
    </van-nav-bar>
    <div class="pd14_16">
      <van-field v-model="searchVal" placeholder="搜索" left-icon="search" />
    </div>
    <div>
      <van-tabs v-model:active="active" shrink swipeable>
        <template #nav-right>
          <div class="flex-1 text-right">
            <van-icon class="mgt15" name="wap-nav" />
          </div>
        </template>
        <!-- <van-tab title="收件箱">内容 1</van-tab>
        <van-tab title="已发送">内容 2</van-tab> -->
        <van-tab v-for="tab in tabs" :key="tab.type" :title="tab.name">{{ tab.list }}</van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue';
  import { useUserStore } from '@/store/modules/user';
  import { getReceiveEmailListApi, getSendEmailListApi } from '@/api/email';
  const userStore = useUserStore();
  const tabs = ref([
    { name: '收件箱', type: 'receive', page: 0, limit: 10, list: [] },
    { name: '已发送', type: 'send', page: 0, limit: 10, list: [] },
  ]);
  const searchVal = ref('');
  const active = ref(0);

  const getReceiveEmailList = async () => {
    const { userInfo } = userStore;
    await getReceiveEmailListApi({
      pageNo: '',
      pageSize: '',
      queryParams: '',
      receiveUsers: userInfo?.username,
    });
  };
  const getSendEmailList = async () => {};

  onMounted(() => {
    getReceiveEmailList();
  });
  watch(
    () => active,
    () => {},
  );
</script>

<style scoped>
  .pd14_16 {
    padding: 14px 16px;
  }
  .mgt15 {
    margin-top: 15px;
  }
</style>
