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
        >
          <template #button>
            <van-button size="small" type="primary" @click="toForgetPassword">忘记密码?</van-button>
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit"> 登录 </van-button>
      </div>
      <div class="flex flex-wrap size10 items-center">
        <van-checkbox v-model="checked" />
        <div class="mgl5"
          >我已阅读并同意
          <span class="color5c size10" @click.stop="toAgree">《隐私服务协议》</span>
          与
          <span class="color5c size10" @click.stop="toWork">《工作服务条款》</span></div
        >
      </div>
      <div class="text-c"><span class="color5c">立即注册</span></div>
    </van-form>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  const username = ref('');
  const password = ref('');
  const checked = ref('');

  const onSubmit = () => {};
  const toForgetPassword = () => {};
  const toAgree = () => {};
  const toWork = () => {};
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
