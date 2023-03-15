declare const chrome: any;

// 右键菜单演示
chrome.contextMenus.create({
  id: 'test',
  title: '测试右键菜单',
  type: 'normal',
  documentUrlPatterns: ['<all_urls>'],
});
chrome.contextMenus.create({
  id: 'addLog',
  title: '添加日志',
  type: 'normal',
  documentUrlPatterns: ['<all_urls>'],
});
chrome.contextMenus.create({
  id: 'baidu_search',
  type: 'normal',
  title: '使用度娘搜索',
  contexts: ['selection'],
  documentUrlPatterns: ['<all_urls>'],
});
chrome.contextMenus.create({
  id: 'baidu_fanyi',
  type: 'normal',
  title: '百度翻译',
  contexts: ['selection'],
  documentUrlPatterns: ['<all_urls>'],
});

chrome.contextMenus.create({
  id: 'shop_search',
  type: 'normal',
  title: '商品搜索',
  contexts: ['selection'],
  documentUrlPatterns: ['<all_urls>'],
});

// 监听上下文菜单点击事件
chrome.contextMenus.onClicked.addListener((info: any) => {
  const { selectionText, menuItemId } = info;
  if (selectionText) {
    switch (menuItemId) {
      case 'baidu_search':
        chrome.windows.create({
          url: `https://www.baidu.com/s?wd=${selectionText}`,
        });
        break;
      case 'baidu_fanyi':
        chrome.windows.create({
          url: `https://fanyi.baidu.com/#zh/en/${selectionText}`,
        });
        break;
      case 'shop_search':
        chrome.tabs.create({
          url: `https://www.alibaba.com/trade/search?tab=all&searchText=${selectionText}`,
        });
        break;
    }
  } else {
    switch (menuItemId) {
      case 'addLog':
        chrome.tabs.query({ active: false, currentWindow: true }, (tabs: any) => {
          console.log(tabs);
          if (tabs.length) {
            chrome.tabs.sendMessage(tabs[0].id, {
              todo: 'addLog',
              data: '123000',
            });
          }
        });
        break;
    }
  }
});
