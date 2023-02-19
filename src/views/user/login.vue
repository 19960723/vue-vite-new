<template>
  <div class="container">
    <!-- img form username password 验证 按钮 跳转注册 -->
    <van-image class="logo_img" width="90" height="90" src="/src/assets/images/logo.png" />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
    </van-form>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  const username = ref('');
  const password = ref('');

  const onSubmit = () => {};
</script>

<style lang="scss" scoped>
  .container {
    // padding: 0 20px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-content: center;
    .logo_img {
      margin: 0 auto;
    }
  }
</style>
