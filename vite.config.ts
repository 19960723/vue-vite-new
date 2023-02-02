import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    // 🔥此处添加全局scss🔥
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/globalVar.scss"',
      },
    },
  },
  resolve: {
    alias: [
      {
        find: /@\//,
        replacement: pathResolve('src') + '/',
      },
    ],
  },
});
