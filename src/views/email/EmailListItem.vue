<template>
  <div class="flex">
    <div>
      <van-image round fit="cover" width="45" height="45" :src="item.portrait" />
    </div>
    <div class="flex-1 ml-2">
      <div class="flex justify-between">
        <div class="flex-1 text-left">{{ active === 1 ? item.receiveUsers : item.mailSender }}</div>
        <div class="flex-1">{{ item.sendTime }}</div>
      </div>
      <div class="text-left">{{ item.title }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    item: {
      type: Object,
      default: () => {},
    },
    active: {
      type: Number,
      default: 0,
    },
  });
</script>

<style></style>
