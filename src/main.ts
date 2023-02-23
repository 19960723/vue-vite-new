import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles/globalVar.scss';
import { registerGlobComp } from '@/components/registerGlobComp';

const app = createApp(App);
// 注册全局组件
registerGlobComp(app);
app.use(router);
app.mount('#app');
