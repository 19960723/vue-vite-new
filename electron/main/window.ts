import { app, BrowserWindow, shell, screen, systemPreferences, ipcMain } from 'electron';

let mainWindow: BrowserWindow | null = null;
export function initWindow() {
  mainWindow = BrowserWindow.getFocusedWindow();
}
ipcMain.on('get-window-info', (event) => {
  event.returnValue = {
    id: mainWindow?.id,
    title: mainWindow?.getTitle(),
    bounds: mainWindow?.getBounds(),
  };
});
//隐藏窗口
ipcMain.on('hide-win', () => {
  mainWindow?.hide();
});
//显示窗口
ipcMain.on('show-win', () => {
  mainWindow?.hide();
});

//显示窗口
ipcMain.on('get-all-win', () => {
  // const winList = BrowserWindow?.getAllWindows();
  // const win_list = winList.map((v) => {
  //   return {
  //     id: v.id,
  //     title: v.title,
  //   };
  // });
  // console.log(win_list);
  console.log('123');
});
