const { Menu, MenuItem } = require('electron');

const customMenu = new Menu();
customMenu.append(new MenuItem({ label: 'Menu Item 1' }));
customMenu.append(new MenuItem({ label: 'Menu Item 2' }));

// 给菜单添加自定义 CSS 类
// customMenu.popupOptions = {
//   className: 'custom-menu',
// };

// 在窗口上设置右键菜单事件监听器
// window.addEventListener('contextmenu', (event) => {
//   event.preventDefault();
//   customMenu.popup();
// });
