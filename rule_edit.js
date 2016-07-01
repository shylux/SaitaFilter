var popup_edit_template = `
<div id="saita_popup">
  <button id="savefilter">Save & Reload</button>
</div>
`
var rule_edit_template = `
<div class="rule">
  <div class="delete">Remove rule</div>

  <label>URL (RegExp)</label>
  <input class="url" type="text" />

  <label>Selector</label>
  <input class="selector" type="text" />

  <label>Type</label>
  <select class="type">
    <option value="txtincludes">Text contains</option>
  </select>

  <div class="txtincludes">
    <label>Text</label>
    <input class="value" type="text" />
  </div>
</div>
`


function saita_edit_rules(addrule) {
  $('body').append(popup_edit_template);

  // load rules
  chrome.storage.sync.get('rules', function(results) {
    for (var i = results['rules'].length-1; i >= 0; i--) {
      var rule_data = results['rules'][i];
      var rule = $(rule_edit_template);
      $('.url', rule).val(rule_data.url);
      $('.selector', rule).val(rule_data.selector);
      $('.type', rule).val(rule_data.type);
      $('.'+rule_data.type+' .value', rule).val(rule_data.value);
      $('#saita_popup').prepend(rule);
    }

    // remove rule
    $('#saita_popup .rule .delete').on('click', function() {
      $(this).parents('.rule').remove();
    });
  });

  if (typeof addrule !== "undefined") {
    var rule = $(rule_edit_template);
    $('.url', rule).val(addrule.url);
    $('.selector', rule).val(addrule.selector);
    $('#saita_popup').prepend(rule);
  }

  $('#saita_popup #savefilter').on('click', function() {
    var rules = $('#saita_popup .rule');
    var rules_data = [];
    for (var i = 0; i < rules.length; i++) {
      var rule = rules.get(i);
      var type = $('.type', rule).val()
      var rule_data = {
        'url': $('.url', rule).val(),
        'selector': $('.selector', rule).val(),
        'type': type,
        'value': $('.'+type+' .value', rule).val()
      };
      rules_data.push(rule_data);
    }

    chrome.storage.sync.set({'rules': rules_data}, function() {
      window.location.reload();
    });
  });
}
