import { ipcRenderer } from 'electron';
export function hide() {
  ipcRenderer.send('win-hide');
}
export function show() {
  ipcRenderer.send('win-show');
}
