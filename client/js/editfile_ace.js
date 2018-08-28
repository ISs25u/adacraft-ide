var $ = require('jquery');
var ace = require('brace');
require('brace/mode/javascript');
require('brace/theme/chrome');
var js_beautify = require('js-beautify').js_beautify;

var aceEditor = null;

var onLoadHandler = null;

function emit_onLoad(content) {
  try {
    if (onLoadHandler) {
      onLoadHandler(content);
    }
  } catch(e) {
    console.error(e);
  }
}

$('#editor').each(function () {
  var $editor = $(this);
  var readOnly = !!$editor.data('readOnly');

  aceEditor = ace.edit(this);

  aceEditor.setReadOnly(readOnly);
  aceEditor.getSession().setMode("ace/mode/javascript");
  aceEditor.$blockScrolling = Infinity;

  $.get($editor.data("fileUrl"), function(content) {
    aceEditor.setValue(content);
    emit_onLoad(content);

    $('#cleanButton').click(function () {
      var original = aceEditor.getValue();
      var beautiful = js_beautify(original, {indent_size: 2});
      if (beautiful !== original)
        aceEditor.setValue(beautiful);
    });

    if (!readOnly) {
      aceEditor.on('change', function(e) {
        $("#status").text("(altered)");
      });

      $('#saveButton').click(function () {
        var button = this;
        button.disabled = true;
        var txt = aceEditor.getValue();
        $.post({
          url: $editor.data('saveUrl'),
          data: { text : txt },
          success: function(data, txtStatus) {
            $('#status').text("(saved)");
          },
          complete: function() {
            button.disabled = false;
          }
        });
      });
    }
  });
});

exports.getContent = function() {
  return aceEditor.getValue();
};

exports.setContent = function(code) {
  var original = aceEditor.getValue();
  if (code != original) {
    aceEditor.setValue(code);
  }
};

exports.onLoad = function(handler) {
  onLoadHandler = handler;
}
