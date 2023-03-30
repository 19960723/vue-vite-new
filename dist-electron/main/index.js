"use strict";
const electron = require("electron");
const node_os = require("node:os");
const node_path = require("node:path");
const { Menu, MenuItem } = require("electron");
const customMenu = new Menu();
customMenu.append(new MenuItem({ label: "Menu Item 1" }));
customMenu.append(new MenuItem({ label: "Menu Item 2" }));
let mainWindow = null;
process.env.DIST_ELECTRON = node_path.join(__dirname, "..");
process.env.DIST = node_path.join(process.env.DIST_ELECTRON, "../dist");
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL ? node_path.join(process.env.DIST_ELECTRON, "../public") : process.env.DIST;
const url$1 = process.env.VITE_DEV_SERVER_URL;
const preload$1 = node_path.join(__dirname, "../preload/index.js");
const winList = [];
const emptyList = [];
function initWindow() {
  mainWindow = electron.BrowserWindow.getFocusedWindow();
  mainWindow == null ? void 0 : mainWindow.once("focus", () => {
    console.log(mainWindow == null ? void 0 : mainWindow.title);
    initWindow();
  });
}
electron.ipcMain.on("electron_window", (event, message) => {
  const { type, id } = message;
  initWindow();
  switch (type) {
    case "get-window-info":
      getWindowInfo(event);
      break;
    case "get-all-win":
      getAllWin(event);
      break;
    case "hide-win":
      hide();
      break;
    case "show-win":
      if (id) {
        show(id);
      }
      break;
    case "close-win":
      close();
      break;
    case "focus-win":
      focus();
      break;
    case "setAlwaysOnTop":
      setAlwaysOnTop(message);
      break;
    case "get-win-position":
      getWinPosition(event);
      break;
    case "set-win-position":
      setWinPosition(message);
      break;
    case "minimize":
      minimize();
      break;
    case "maximize":
      maximize();
      break;
  }
});
electron.ipcMain.on("routerWindow", (e, routerObj) => {
  var _a;
  const winList2 = (_a = electron.BrowserWindow) == null ? void 0 : _a.getAllWindows();
  const routerName = routerObj.name;
  routerObj.title = routerObj.name;
  let win2 = winList2.find((v) => v.title == routerName);
  if (win2) {
    sendMessage(win2, { router: { ...routerObj, id: win2.id } });
    win2.show();
    return;
  }
  if (emptyList.length && routerObj.name) {
    win2 = emptyList[0];
    win2.title = routerName;
    emptyList.splice(0, 1);
    emptyList.length === 0 && createNewPageWindow();
  }
  if (!win2) {
    routerObj.name && createNewPageWindow(routerObj);
    emptyList.length === 0 && createNewPageWindow();
    return;
  }
  win2.routerName = routerObj.name;
  sendMessage(win2, { router: { ...routerObj, id: win2.id } });
});
function getWindowInfo(event) {
  event.returnValue = {
    id: mainWindow == null ? void 0 : mainWindow.id,
    title: mainWindow == null ? void 0 : mainWindow.getTitle(),
    bounds: mainWindow == null ? void 0 : mainWindow.getBounds()
  };
}
function getAllWin(event) {
  const winList2 = electron.BrowserWindow.getAllWindows();
  const win_list = winList2.map((v) => {
    return {
      id: v.id,
      title: v.title
    };
  });
  event.returnValue = {
    win_list
  };
  console.log(win_list);
}
function hide() {
  mainWindow == null ? void 0 : mainWindow.hide();
}
function show(id) {
  var _a;
  if (id) {
    const winList2 = (_a = electron.BrowserWindow) == null ? void 0 : _a.getAllWindows();
    const findWin = winList2.find((v) => v.id == id);
    findWin == null ? void 0 : findWin.show();
    return;
  }
  mainWindow == null ? void 0 : mainWindow.show();
}
function close() {
  mainWindow == null ? void 0 : mainWindow.close();
}
function focus() {
  mainWindow == null ? void 0 : mainWindow.focus();
}
function setAlwaysOnTop(message) {
  const { flag } = message;
  mainWindow == null ? void 0 : mainWindow.setAlwaysOnTop(flag);
}
function getWinPosition(event) {
  const pos = mainWindow == null ? void 0 : mainWindow.getPosition();
  event.returnValue = {
    pos
  };
}
function setWinPosition(message) {
  const { x, y } = message;
  mainWindow == null ? void 0 : mainWindow.setPosition(parseInt(x), parseInt(y));
}
function minimize() {
  mainWindow == null ? void 0 : mainWindow.minimize();
}
function maximize() {
  mainWindow == null ? void 0 : mainWindow.maximize();
}
function createNewPageWindow(routerObj, parent2) {
  if (process.env.NODE_ENV === "development" && winList.length + emptyList.length >= 4) {
    routerObj && electron.dialog.showMessageBox({
      title: "提示",
      message: "开发模式,不要打开太多窗口"
    });
    return;
  }
  const browserOptions = {
    icon: node_path.join(process.env.PUBLIC, "favicon.ico"),
    show: false,
    ...routerObj,
    webPreferences: {
      preload: preload$1,
      nodeIntegration: true,
      contextIsolation: false
    }
  };
  const win2 = new electron.BrowserWindow(browserOptions);
  if (!routerObj) {
    emptyList.push(win2);
  }
  win2.currentName = "newPageWindow";
  const webContents = win2.webContents;
  webContents.on("new-window", (event, url2) => {
  });
  webContents.on("before-input-event", (event, input) => {
  });
  win2.loadURL(`${url$1}#empty`);
  win2.once("ready-to-show", () => {
    sendMessage(win2, { ready: true });
  });
  win2.on("focus", () => {
    if (!(win2 && win2.isEnabled())) {
      if (win2.getChildWindows() && win2.getChildWindows().length) {
        win2.getChildWindows().forEach((v) => {
          v.show();
        });
      } else {
        win2.setEnabled(true);
      }
    }
  });
  win2.on("close", () => {
  });
  win2.on("closed", () => {
  });
  win2.on("hide", () => {
  });
}
function sendMessage(win2, text) {
  if (!win2)
    return;
  console.log(text);
  win2.webContents.send("newPageMessage", text);
}
process.env.DIST_ELECTRON = node_path.join(__dirname, "..");
process.env.DIST = node_path.join(process.env.DIST_ELECTRON, "../dist");
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL ? node_path.join(process.env.DIST_ELECTRON, "../public") : process.env.DIST;
if (node_os.release().startsWith("6.1"))
  electron.app.disableHardwareAcceleration();
if (process.platform === "win32")
  electron.app.setAppUserModelId(electron.app.getName());
if (!electron.app.requestSingleInstanceLock()) {
  electron.app.quit();
  process.exit(0);
}
let isHasScreen = false;
async function checkAndApplyDevicePrivilege() {
  const cameraPrivilege = electron.systemPreferences.getMediaAccessStatus("camera");
  if (cameraPrivilege !== "granted") {
    await electron.systemPreferences.askForMediaAccess("camera");
  }
  const micPrivilege = electron.systemPreferences.getMediaAccessStatus("microphone");
  if (micPrivilege !== "granted") {
    await electron.systemPreferences.askForMediaAccess("microphone");
  }
  const screenPrivilege = electron.systemPreferences.getMediaAccessStatus("screen");
  console.log(screenPrivilege);
  if (screenPrivilege === "granted") {
    isHasScreen = true;
  }
}
let win = null;
const preload = node_path.join(__dirname, "../preload/index.js");
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = node_path.join(process.env.DIST, "index.html");
async function createWindow() {
  await checkAndApplyDevicePrivilege();
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  win = new electron.BrowserWindow({
    title: "Main window",
    width,
    height,
    minWidth: 1200,
    minHeight: 640,
    // autoHideMenuBar: true,
    icon: node_path.join(process.env.PUBLIC, "favicon.ico"),
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  if (process.env.VITE_DEV_SERVER_URL) {
    const installExtension = require("electron-devtools-installer");
    installExtension.default(installExtension.VUEJS_DEVTOOLS).then(() => {
    }).catch((err) => {
      console.log("Unable to install `vue-devtools`: \n", err);
    });
    win.loadURL(url);
    win.webContents.openDevTools();
  } else {
    win.loadFile(indexHtml);
  }
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", { isHasScreen });
  });
  win.webContents.setWindowOpenHandler(({ url: url2 }) => {
    if (url2.startsWith("https:"))
      electron.shell.openExternal(url2);
    return { action: "deny" };
  });
  createNewPageWindow();
  initWindow();
}
electron.app.whenReady().then(createWindow);
electron.app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin")
    electron.app.quit();
});
electron.app.on("second-instance", () => {
  if (win) {
    if (win.isMinimized())
      win.restore();
    win.focus();
  }
});
electron.app.on("activate", () => {
  const allWindows = electron.BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});
electron.ipcMain.handle("open-win", (_, arg) => {
  var _a;
  const { title } = arg;
  const winList2 = (_a = electron.BrowserWindow) == null ? void 0 : _a.getAllWindows();
  const findWin = winList2.find((v) => v.title == title);
  if (findWin) {
    findWin.show();
    return;
  }
  const childWindow = new electron.BrowserWindow({
    ...arg,
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  initWindow();
  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${url}#${title}`);
  } else {
    childWindow.loadFile(indexHtml, { hash: arg });
  }
});
//# sourceMappingURL=index.js.map
