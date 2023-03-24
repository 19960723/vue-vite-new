"use strict";
const electron = require("electron");
const node_os = require("node:os");
const node_path = require("node:path");
const { Menu, MenuItem } = require("electron");
const customMenu = new Menu();
customMenu.append(new MenuItem({ label: "Menu Item 1" }));
customMenu.append(new MenuItem({ label: "Menu Item 2" }));
let mainWindow = null;
function initWindow() {
  mainWindow = electron.BrowserWindow.getFocusedWindow();
  mainWindow == null ? void 0 : mainWindow.once("focus", () => {
    initWindow();
  });
}
electron.ipcMain.on("get-window-info", (event) => {
  event.returnValue = {
    id: mainWindow == null ? void 0 : mainWindow.id,
    title: mainWindow == null ? void 0 : mainWindow.getTitle(),
    bounds: mainWindow == null ? void 0 : mainWindow.getBounds()
  };
});
electron.ipcMain.on("get-all-win", (event) => {
  var _a;
  const winList = (_a = electron.BrowserWindow) == null ? void 0 : _a.getAllWindows();
  const win_list = winList.map((v) => {
    return {
      id: v.id,
      title: v.title
    };
  });
  event.returnValue = {
    win_list
  };
  console.log(win_list);
});
electron.ipcMain.on("hide-win", () => {
  mainWindow == null ? void 0 : mainWindow.hide();
});
electron.ipcMain.on("show-win", () => {
  mainWindow == null ? void 0 : mainWindow.show();
});
electron.ipcMain.on("close-win", () => {
  mainWindow == null ? void 0 : mainWindow.close();
});
electron.ipcMain.on("focus-win", () => {
  mainWindow == null ? void 0 : mainWindow.focus();
});
electron.ipcMain.on("setAlwaysOnTop", (e, flag) => {
  mainWindow == null ? void 0 : mainWindow.setAlwaysOnTop(flag);
});
electron.ipcMain.on("get-win-position", (e) => {
  const pos = mainWindow == null ? void 0 : mainWindow.getPosition();
  e.returnValue = {
    pos
  };
});
electron.ipcMain.on("set-win-position", (e, message) => {
  const { x, y } = message;
  mainWindow == null ? void 0 : mainWindow.setPosition(parseInt(x), parseInt(y));
});
electron.ipcMain.on("minimize", () => {
  mainWindow == null ? void 0 : mainWindow.minimize();
});
electron.ipcMain.on("maximize", () => {
  mainWindow == null ? void 0 : mainWindow.maximize();
});
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
  const winList = (_a = electron.BrowserWindow) == null ? void 0 : _a.getAllWindows();
  const findWin = winList.find((v) => v.title == title);
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
