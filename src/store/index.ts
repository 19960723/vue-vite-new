import type { App } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersist from 'pinia-plugin-persist';
const store = createPinia();

export function setupStore(app: App<Element>) {
  store.use(piniaPluginPersist);
  app.use(store);
}

export { store };
