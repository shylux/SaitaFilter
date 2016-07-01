$(function() {
  chrome.storage.sync.get('rules', function(results) {
    if (!results.hasOwnProperty('rules')) return;
    for (var i = 0; i < results['rules'].length; i++) {
      var rule_data = results['rules'][i];
      var regex = new RegExp(rule_data.url);
      if (regex.test(window.location.href)) {
        var objs = $(rule_data.selector);
        for (var j = 0; j < objs.length; j++) {
          var obj = objs[j];
          if ($(obj).html().indexOf(rule_data.value) == -1) {
            $(obj).hide();
          }
        }
      }
    }
  });
});
