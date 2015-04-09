jQuery(function ($) {
  var $editor = $('#editor');
  var readOnly = !!$editor.data('readOnly')

  require(['droplet'], function (droplet){
    var dropletEditor = new droplet.Editor($editor[0], dropletOptions);
    dropletEditor.setEditorState(false);

    var aceEditor = dropletEditor.aceEditor;
    aceEditor.setReadOnly(readOnly);
    aceEditor.getSession().setMode("ace/mode/javascript");

    $.get($editor.data("fileUrl"), function(content) {
      dropletEditor.setValue(content);

      $('#cleanButton').click(function () {
        dropletEditor.setValue(js_beautify(dropletEditor.getValue()));
      });

      $('#toggleBlocksButton').click(function () {
        dropletEditor.toggleBlocks();
      });

      if (!readOnly) {
        dropletEditor.on('change', function(e) {
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
});

