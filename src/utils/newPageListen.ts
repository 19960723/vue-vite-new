import { ipcRenderer } from 'electron';
import { hide, show } from '@/utils/electron-api';
import router from '@/router';
ipcRenderer.on('newPageMessage', (event, message) => {
  console.log(message, '===');
  if (message.hide) {
    router.replace({ name: 'Empty' }).catch((err) => {});
  }
  if (message.router) {
    changeRouter(message.router);
  }
  if (message.routerWindow) {
  }
  if (message.ipcRenderer) {
  }
});

function changeRouter(routerObj: any) {
  routerObj.params && routerObj.params.noshow && hide();
  if (routerObj) {
    console.log(router);
    router
      .push(routerObj)
      .then(() => {
        console.log('=-==');
        show();
      })
      .catch(() => {
        console.log('=-==');
        show();
      });
  }
}
