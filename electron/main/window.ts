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
    console.log(mainWindow?.title);
    initWindow();
  });
}
// 事件监听
ipcMain.on('electron_window', (event, message) => {
  const { type, id } = message;
  initWindow();
  switch (type) {
    case 'get-window-info':
      getWindowInfo(event);
      break;
    case 'get-all-win':
      getAllWin(event);
      break;
    case 'hide-win':
      hide();
      break;
    case 'show-win':
      if (id) {
        show(id);
      }
      break;
    case 'close-win':
      close();
      break;
    case 'focus-win':
      focus();
      break;
    case 'setAlwaysOnTop':
      setAlwaysOnTop(message);
      break;
    case 'get-win-position':
      getWinPosition(event);
      break;
    case 'set-win-position':
      setWinPosition(message);
      break;
    case 'minimize':
      minimize();
      break;
    case 'maximize':
      maximize();
      break;
  }
});
// 监听创建新窗口
ipcMain.on('routerWindow', (e, routerObj) => {
  const winList = BrowserWindow?.getAllWindows();
  const routerName = routerObj.name;
  routerObj.title = routerObj.name;
  let win = winList.find((v) => v.title == routerName);
  if (win) {
    sendMessage(win, { router: { ...routerObj, id: win.id } });
    win.show();
    return;
  }
  if (emptyList.length && routerObj.name) {
    win = emptyList[0];
    win.title = routerName;
    emptyList.splice(0, 1);
    emptyList.length === 0 && createNewPageWindow();
  }
  if (!win) {
    routerObj.name && createNewPageWindow(routerObj, parent);
    emptyList.length === 0 && createNewPageWindow();
    return;
  }
  win.routerName = routerObj.name;
  sendMessage(win, { router: { ...routerObj, id: win.id } });
});

// 获取当前窗口信息
function getWindowInfo(event) {
  event.returnValue = {
    id: mainWindow?.id,
    title: mainWindow?.getTitle(),
    bounds: mainWindow?.getBounds(),
  };
}
// 获取所有的窗口列表
function getAllWin(event) {
  const winList = BrowserWindow.getAllWindows();
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
}
//隐藏窗口
function hide() {
  mainWindow?.hide();
}
//显示窗口
function show(id) {
  if (id) {
    const winList = BrowserWindow?.getAllWindows();
    const findWin = winList.find((v) => v.id == id);
    findWin?.show();
    return;
  }
  mainWindow?.show();
}
//关闭窗口
function close() {
  mainWindow?.close();
}
//聚焦窗口
function focus() {
  mainWindow?.focus();
}
// 置顶窗口
function setAlwaysOnTop(message) {
  const { flag } = message;
  mainWindow?.setAlwaysOnTop(flag);
}
// 获取窗口位置
function getWinPosition(event) {
  const pos = mainWindow?.getPosition();
  event.returnValue = {
    pos,
  };
}
// 设置窗口位置
function setWinPosition(message) {
  const { x, y } = message;
  mainWindow?.setPosition(parseInt(x), parseInt(y));
}
// 最小化
function minimize() {
  mainWindow?.minimize();
}
// 最大化
function maximize() {
  mainWindow?.maximize();
}
// 创建新窗口
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
    show: false,
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
// 向渲染进程发送信息
function sendMessage(win, text) {
  if (!win) return;
  console.log(text);
  win.webContents.send('newPageMessage', text);
}
