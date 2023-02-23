import type { UserConfig, ConfigEnv } from 'vite';
import { defineConfig } from 'vite';
import DefineOptions from 'unplugin-vue-define-options/vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from 'path';
import { viteMockServe } from 'vite-plugin-mock';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}
export default defineConfig(({ command }: ConfigEnv): UserConfig => {
  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [VantResolver()],
      }),
      Components({
        resolvers: [VantResolver()],
      }),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve',
      }),
      DefineOptions(),
    ],
    resolve: {
      alias: [
        {
          find: /@\//,
          replacement: pathResolve('src') + '/',
        },
      ],
    },
    css: {
      // 🔥此处添加全局scss🔥
      preprocessorOptions: {
        scss: {
          // additionalData: '@import "@/assets/styles/globalVar.scss"',
        },
      },
    },
  };
});

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     vue(),
//     viteMockServe({
//       mockPath: 'mock',
//       localEnabled: command === 'serve',
//     }),
//   ],
//   css: {
//     // 🔥此处添加全局scss🔥
//     preprocessorOptions: {
//       scss: {
//         additionalData: '@import "@/styles/globalVar.scss"',
//       },
//     },
//   },
//   resolve: {
//     alias: [
//       {
//         find: /@\//,
//         replacement: pathResolve('src') + '/',
//       },
//     ],
//   },
// });
