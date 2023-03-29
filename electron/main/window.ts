import { app, BrowserWindow, shell, screen, systemPreferences, ipcMain, dialog } from 'electron';
import { join } from 'node:path';

let mainWindow: BrowserWindow | null = null;
process.env.DIST_ELECTRON = join(__dirname, '..');
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist');
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST;

const url = process.env.VITE_DEV_SERVER_URL;
const preload = join(__dirname, '../preload/index.js');
const winList: Array<BrowserWindow> = []; // 打开窗口的列表
const emptyList: Array<BrowserWindow> = []; // 预加载空页面
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
// 监听创建新窗口
ipcMain.on('routerWindow', (e, routerObj) => {
  const winList = BrowserWindow?.getAllWindows();
  const routerName = routerObj.name;
  routerObj.title = routerObj.name;
  let win = winList.find((v) => v.title == routerName);
  if (win) {
    sendMessage(win, { router: routerObj });
    win.show();
    return;
  }
  if (emptyList.length && routerObj.name) {
    win = emptyList[0];
    emptyList.length === 0 && createNewPageWindow();
  }
  if (!win) {
    routerObj.name && createNewPageWindow(routerObj, parent);
    emptyList.length === 0 && createNewPageWindow();
    return;
  }
  win.routerName = routerObj.name;
  sendMessage(win, { router: routerObj });
});

export function createNewPageWindow(routerObj?: Object, parent?: Object) {
  if (process.env.NODE_ENV === 'development' && winList.length + emptyList.length >= 4) {
    routerObj &&
      dialog.showMessageBox({
        title: '提示',
        message: '开发模式,不要打开太多窗口',
      });
    return;
  }
  const browserOptions = {
    icon: join(process.env.PUBLIC, 'favicon.ico'),
    // show: false,
    ...routerObj,
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  };
  const win = new BrowserWindow(browserOptions);
  if (!routerObj) {
    emptyList.push(win);
  }
  win.currentName = 'newPageWindow';
  const webContents = win.webContents;
  // 阻止新窗口的创建
  webContents.on('new-window', (event, url) => {});
  webContents.on('before-input-event', (event, input) => {});

  // 预加载个空页面
  win.loadURL(`${url}#empty`);
  win.once('ready-to-show', () => {
    sendMessage(win, { ready: true });
  });
  win.on('focus', () => {
    if (!(win && win.isEnabled())) {
      if (win.getChildWindows() && win.getChildWindows().length) {
        win.getChildWindows().forEach((v) => {
          v.show();
        });
      } else {
        win.setEnabled(true);
      }
    }
  });
  win.on('close', () => {});
  win.on('closed', () => {});
  win.on('hide', () => {});
}
function sendMessage(win, text) {
  if (!win) return;
  console.log(text);
  win.webContents.send('newPageMessage', text);
}
