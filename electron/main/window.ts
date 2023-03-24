import { app, BrowserWindow, shell, screen, systemPreferences, ipcMain } from 'electron';

let mainWindow: BrowserWindow | null = null;
// 初始化窗口
export function initWindow() {
  mainWindow = BrowserWindow.getFocusedWindow();
  mainWindow?.once('focus', () => {
    initWindow();
  });
}
// 获取当前窗口信息
ipcMain.on('get-window-info', (event) => {
  event.returnValue = {
    id: mainWindow?.id,
    title: mainWindow?.getTitle(),
    bounds: mainWindow?.getBounds(),
  };
});
// 获取所有的窗口列表
ipcMain.on('get-all-win', (event) => {
  const winList = BrowserWindow?.getAllWindows();
  const win_list = winList.map((v) => {
    return {
      id: v.id,
      title: v.title,
    };
  });
  event.returnValue = {
    win_list,
  };
  console.log(win_list);
});
//隐藏窗口
ipcMain.on('hide-win', () => {
  mainWindow?.hide();
});
//显示窗口
ipcMain.on('show-win', () => {
  mainWindow?.show();
});
//关闭窗口
ipcMain.on('close-win', () => {
  mainWindow?.close();
});
//聚焦窗口
ipcMain.on('focus-win', () => {
  mainWindow?.focus();
});
//置顶窗口
ipcMain.on('setAlwaysOnTop', (e, flag) => {
  mainWindow?.setAlwaysOnTop(flag);
});
// 获取窗口位置
ipcMain.on('get-win-position', (e) => {
  const pos = mainWindow?.getPosition();
  e.returnValue = {
    pos,
  };
});
// 设置窗口位置
ipcMain.on('set-win-position', (e, message) => {
  const { x, y } = message;
  mainWindow?.setPosition(parseInt(x), parseInt(y));
});
// 最小化
ipcMain.on('minimize', () => {
  mainWindow?.minimize();
});
// 最大化
ipcMain.on('maximize', () => {
  mainWindow?.maximize();
});
