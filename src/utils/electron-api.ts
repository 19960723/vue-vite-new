import { ipcRenderer } from 'electron';
// 隐藏窗口
export function hide() {
  ipcRenderer.send('electron_window', {
    type: 'hide-win',
  });
}
// 显示窗口
export function show(id?: number) {
  ipcRenderer.send('electron_window', {
    type: 'show-win',
    id,
  });
}
// 创建新窗口
export function routerWindow(options?: Object) {
  // ipcRenderer.invoke('open-win', {
  //   title: 'room',
  // });
  ipcRenderer.send('routerWindow', {
    ...options,
  });
}
// 获取窗口信息
export function getWindowInfo() {
  const windowInfo = ipcRenderer.sendSync('electron_window', {
    type: 'get-window-info',
  });
  return windowInfo;
}
// 获取所有窗口
export function getAllWin() {
  const win_list = ipcRenderer.sendSync('electron_window', {
    type: 'get-all-win',
  });
  return win_list;
}
