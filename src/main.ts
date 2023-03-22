import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import router from './router';
import { ipcRenderer } from 'electron';
import { registerGlobComp } from '@/components/registerGlobComp';

if (window.isHasScreen === undefined) {
  window.isHasScreen = false;
}
ipcRenderer.on('main-process-message', (_event, ...args) => {
  if (args.length > 0) {
    window.isHasScreen = args[0].isHasScreen;
  }
});

const app = createApp(App);
// 注册全局组件
registerGlobComp(app);
app.use(router);
app.use(createPinia());
app.mount('#app').$nextTick(() => {
  postMessage({ payload: 'removeLoading' }, '*');
});
