import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { setupStore } from './store';
import './assets/styles/globalVar.scss';
import 'vant/lib/index.css';
import { registerGlobComp } from '@/components/registerGlobComp';

const app = createApp(App);
// 配置 store
setupStore(app);
// 注册全局组件
registerGlobComp(app);
app.use(router);
app.mount('#app');
