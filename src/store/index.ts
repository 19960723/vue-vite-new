import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => {
    return { token: '0' };
  },
  actions: {
    async setToken(token: string) {
      this.token = token;
      this.$patch((state) => {
        state.token = token;
      });
    },
  },
  getters: {
    token: (state) => state.token,
  },
});
