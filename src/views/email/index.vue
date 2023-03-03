<template>
  <div class="bg_f2f4f6 h-full flex flex-col">
    <van-nav-bar title="收件箱" left-arrow>
      <template #left>
        <span>全选</span>
      </template>
      <template #right>
        <span>完成</span>
      </template>
    </van-nav-bar>
    <div class="flex-1 overflow-auto">
      <div class="pd14_16">
        <van-field v-model="searchVal" placeholder="搜索" left-icon="search" />
      </div>
      <van-tabs v-model:active="active" offset-top="46px" sticky shrink swipeable>
        <template #nav-right>
          <div class="flex-1 text-right">
            <van-icon class="mgt15" name="wap-nav" />
          </div>
        </template>
        <van-tab v-for="tab in tabs" :key="tab.type" :title="tab.name">
          <van-list
            v-model:loading="tab.loading"
            :finished="tab.finished"
            @load="onLoad"
            finished-text="没有更多了"
          >
            <!-- <van-cell v-for="item in 30" :key="item" :title="item" /> -->
            <van-cell v-for="(item, index) in showList" :key="`${tab.type}-${index}`">
              <EmailListItem :item="item" :active="active" />
            </van-cell>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, watch, computed } from 'vue';
  import { showToast } from 'vant';
  import { useUserStore } from '@/store/modules/user';
  import { getReceiveEmailListApi, getSendEmailListApi } from '@/api/email';
  import EmailListItem from './EmailListItem.vue';
  const userStore = useUserStore();
  const tabList = ref({
    receive: [],
    send: [],
  });
  const tabs = ref([
    {
      name: '收件箱',
      type: 'receive',
      page: 1,
      limit: 10,
      loading: true,
      finished: false,
    },
    {
      name: '已发送',
      type: 'send',
      page: 1,
      limit: 10,
      loading: true,
      finished: false,
    },
  ]);
  const searchVal = ref('');
  const active = ref(0);

  const getReceiveEmailList = async () => {
    const { userInfo } = userStore;
    let currentInfo = tabs.value[active.value];
    if (currentInfo.finished) return;
    let results = await getReceiveEmailListApi({
      pageNo: currentInfo.page,
      pageSize: tabs.value[active.value].limit,
      queryParams: '',
      receiveUsers: userInfo?.username,
    });
    const { result, code, success, message } = results;
    if (code == 200 && success) {
      currentInfo.loading = false;
      const { records, pages, current } = result;
      tabList.value[currentInfo.type] = [].concat(
        currentInfo.finished ? [] : tabList.value[currentInfo.type],
        records,
      );
      currentInfo.finished = pages == current;
      currentInfo.loading = false;
    } else {
      showToast({ message });
    }
  };
  const getSendEmailList = async () => {
    const { userInfo } = userStore;
    let currentInfo = tabs.value[active.value];
    if (currentInfo.finished) return;
    let results = await getSendEmailListApi({
      pageNo: currentInfo.page,
      pageSize: tabs.value[active.value].limit,
      queryParams: '',
      mailSender: userInfo?.username,
    });
    const { result, code, success, message } = results;
    if (code == 200 && success) {
      const { records, pages, current } = result;
      tabList.value[currentInfo.type] = [].concat(
        currentInfo.finished ? [] : tabList.value[currentInfo.type],
        records,
      );
      currentInfo.finished = pages == current;
    } else {
      showToast({ message });
    }
  };
  const loadList = (isNext?: Boolean) => {
    let currentInfo = tabs.value[active.value];
    isNext && ++currentInfo.page;
    if (active.value == 0) {
      getReceiveEmailList();
    } else {
      getSendEmailList();
    }
  };
  const showList = computed(() => {
    const curTab = tabs.value[active.value];
    return tabList.value[curTab.type];
  });
  const onLoad = async () => {
    loadList(true);
  };

  onMounted(() => {
    getReceiveEmailList();
  });
  watch(
    () => active.value,
    () => {
      loadList();
    },
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
