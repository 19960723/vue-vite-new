declare module 'vue' {
  export interface GlobalComponents {
    ChooseArea: typeof import('./src/components/chooseArea/index.vue')['default'];
    Container: typeof import('./src/components/Container/index.vue')['default'];
    ElAside: typeof import('element-plus/es')['ElAside'];
    ElButton: typeof import('element-plus/es')['ElButton'];
    ElCol: typeof import('element-plus/es')['ElCol'];
    ElContainer: typeof import('element-plus/es')['ElContainer'];
    ElForm: typeof import('element-plus/es')['ElForm'];
    ElFormItem: typeof import('element-plus/es')['ElFormItem'];
    ElHeader: typeof import('element-plus/es')['ElHeader'];
    ElIcon: typeof import('element-plus/es')['ElIcon'];
    ElInput: typeof import('element-plus/es')['ElInput'];
    ElMain: typeof import('element-plus/es')['ElMain'];
    ElMenu: typeof import('element-plus/es')['ElMenu'];
    ElMenuItem: typeof import('element-plus/es')['ElMenuItem'];
    ElOption: typeof import('element-plus/es')['ElOption'];
    ElRow: typeof import('element-plus/es')['ElRow'];
    ElSelect: typeof import('element-plus/es')['ElSelect'];
    ElTimePicker: typeof import('element-plus/es')['ElTimePicker'];
    HelloWorld: typeof import('./src/components/HelloWorld.vue')['default'];
    NavHeader: typeof import('./src/components/Container/NavHeader/index.vue')['default'];
    NavMenu: typeof import('./src/components/Container/NavMenu/index.vue')['default'];
    Src: typeof import('./src/components/menu/src/index.vue')['default'];
  }
}

export {};
