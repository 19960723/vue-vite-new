import type { App } from 'vue';
import chooseArea from './chooseArea.vue';

const components: any = [chooseArea];

export function registerGlobComp(app: App) {
  components.forEach((comp: any) => {
    app.component(comp.name || comp.displayName, comp);
  });
}
