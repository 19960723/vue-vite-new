import type { UserConfig, ConfigEnv } from 'vite';
import { defineConfig } from 'vite';
import DefineOptions from 'unplugin-vue-define-options/vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { viteMockServe } from 'vite-plugin-mock';
import crx from 'vite-plugin-crx-mv3';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}
console.log(DefineOptions);
export default defineConfig(({ command }: ConfigEnv): UserConfig => {
  return {
    plugins: [
      vue(),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve',
      }),
      DefineOptions(),
      crx({
        manifest: './src/manifest.json',
      }),
    ],
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
