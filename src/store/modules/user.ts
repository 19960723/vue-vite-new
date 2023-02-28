import { defineStore } from 'pinia';
import type { UserInfo } from '/#/store';
import { loginApi } from '@/api/user';
import { showToast } from 'vant';
interface UserState {
  userInfo: UserInfo | null;
  token?: string;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => {
    return { token: '', userInfo: null };
  },
  actions: {
    setToken(token: string) {
      this.token = token ? token : '';
      // this.$patch((state) => {
      //   state.token = token;
      // });
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;
    },
    async login(loginData: any) {
      try {
        const data = await loginApi(loginData);
        const { code, success, message, result } = data as any;
        if (code == 200 && success) {
          showToast({ message: '登录成功' });
          const { imToken, imUserId, token, username, senior, realName } = result;
          this.setToken(token);
        } else {
          showToast({ message });
        }
        return;
      } catch (err) {
        return Promise.reject(err);
      }
    },
  },
  getters: {
    getToken(): string | undefined {
      return this.token;
    },
  },
});
