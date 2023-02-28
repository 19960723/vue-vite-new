<template>
  <div class="container">
    <!-- img form username password 验证 按钮 跳转注册 -->
    <van-image class="logo_img" width="90" height="90" src="/src/assets/vue.svg" />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="username"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        >
          <template #button>
            <van-button size="small" type="primary" @click="toForgetPassword">忘记密码?</van-button>
          </template>
        </van-field>
        <van-field name="passwordChecked">
          <template #input>
            <van-checkbox v-model="passwordChecked">记住密码</van-checkbox>
          </template>
        </van-field>
        <van-field>
          <template #input>
            <van-button round block type="primary" native-type="submit"> 登录 </van-button>
          </template>
        </van-field>
        <!-- <van-field name="checkbox">
          <template #input>
            <van-checkbox v-model="checked">
              <div class="flex flex-wrap size10 items-center">
                <div class="mgl5">
                  我已阅读并同意
                  <span class="color5c size10" @click.stop="toAgree">《隐私服务协议》</span>
                  与
                  <span class="color5c size10" @click.stop="toWork">《工作服务条款》</span>
                </div>
              </div>
            </van-checkbox>
          </template>
        </van-field> -->
      </van-cell-group>
    </van-form>
  </div>
</template>

<script lang="ts" setup>
  import { v4 as uuidv4 } from 'uuid';
  import { ref } from 'vue';
  import { showToast } from 'vant';
  import { getOsInfo } from '@/utils';
  import { useUserStore } from '@/store/modules/user';

  const userStore = useUserStore();

  const username = ref('');
  const password = ref('');
  const passwordChecked = ref(false);

  const onSubmit = async () => {
    try {
      const deviceInfo = getOsInfo();
      const params = {
        username: username.value,
        password: password.value,
        clientId: uuidv4(),
        platForm: 1,
        deviceName: deviceInfo.version,
      };
      await userStore.login(params);
    } catch (err) {
      showToast({ message: '登录错误' });
    }
  };
  const toForgetPassword = () => {};
</script>

<style lang="scss" scoped>
  .container {
    // padding: 0 20px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-content: center;
    .logo_img {
      margin: 200px auto 50px;
    }
  }
</style>
