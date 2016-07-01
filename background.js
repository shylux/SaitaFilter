
chrome.contextMenus.create({
  'title': 'Create a filter on this page',
  'contexts': ['page', 'frame', 'selection', 'link', 'image'],
  'onclick': function(menu, tab) {
    chrome.tabs.executeScript(
      tab.id,
      {'file': 'rule_add.js'}
    );
  }
});


chrome.contextMenus.create({
  'title': 'Edit the filter on this page',
  'contexts': ['page', 'frame', 'selection', 'link', 'image'],
  'onclick': function(menu, tab) {
    chrome.tabs.executeScript(
      tab.id,
      {'code': 'saita_edit_rules();'}
    );
  }
});
