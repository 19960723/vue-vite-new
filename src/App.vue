<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useRouter } from 'vue-router';
  const transitionName = ref('router-fade');
  let includeList = ref<any[]>([]);
  let router = useRouter();
  watch(
    () => router.currentRoute.value,
    (to) => {
      const keepAlive = to.meta.keepAlive;
      if (keepAlive && !includeList.value.includes(to.name)) {
        includeList.value.push(to.name);
      }
    },
  );
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition :name="transitionName" mode="out-in">
      <keep-alive :include="includeList">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<style scoped>
  .slide-left-enter,
  .slide-right-leave-active {
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }

  .slide-left-leave-active,
  .slide-right-enter {
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100%, 0);
  }

  .router-fade-enter,
  .router-fade-leave-to {
    transform: scale(0);
  }
  .router-fade-enter-to,
  .router-fade-leave {
    transform: scale(1);
  }
  .router-fade-enter-active,
  .router-fade-leave-active {
    transition: all 0.2s;
  }
</style>
