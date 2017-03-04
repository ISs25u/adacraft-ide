var $ = require('jquery');
var ace = require('brace');
require('brace/mode/javascript');
require('brace/theme/chrome');
var js_beautify = require('js-beautify').js_beautify;
var droplet = require('droplet-editor/src/main.coffee');
var dropletOptions = require('./dropletOptions');
require('droplet-editor/css/droplet.css');

$('#editor').each(function () {
  var $editor = $(this);
  var readOnly = !!$editor.data('readOnly');

  var dropletEditor = new droplet.Editor(this, dropletOptions);
  dropletEditor.setEditorState(false);

  var aceEditor = dropletEditor.aceEditor;
  //var aceEditor = ace.edit(this);

  aceEditor.setReadOnly(readOnly);
  aceEditor.getSession().setMode("ace/mode/javascript");
  aceEditor.$blockScrolling = Infinity;

  $.get($editor.data("fileUrl"), function(content) {
    dropletEditor.setValue(content);

    $('#cleanButton').click(function () {
      var original = aceEditor.getValue();
      var beautiful = js_beautify(original, {indent_size: 2});
      if (beautiful !== original)
        aceEditor.setValue(beautiful);
    });

    $('#toggleBlocksButton').click(function () {
      dropletEditor.toggleBlocks();
    });

    if (!readOnly) {
      aceEditor.on('change', function(e) {
        $("#status").text("(altered)");
      });

      $('#saveButton').click(function () {
        var txt = aceEditor.getValue();
        $.post($editor.data('saveUrl'), { text : txt }, 
          function(data, txtStatus) {
            $('#status').text("(saved)");
          }
        );
      });
    }
  });

});

