import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import { registerGlobComp } from '@/components/registerGlobComp';

const app = createApp(App);
// 注册全局组件
registerGlobComp(app);
app.use(router);
app.mount('#app');
