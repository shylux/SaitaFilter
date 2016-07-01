$(function() {
$("#add-filter").click(function() {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    tab = tabs[0];
    chrome.tabs.executeScript(tab.id, {
        "file": "add_rule.js"
    }, function (results) { // Execute your code
        console.log("Script Executed .. "); // Notification on Completion
        window.close();
    });
  });
});

});
