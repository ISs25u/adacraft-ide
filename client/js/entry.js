var $ = require('jquery');
var textEditor = require('./editfile_ace.js');
var Blockly = null;

var BLOCKS_MARKER = '/* Blocks\n';

var default_toolbox =
   '<xml>' +
   '   <category name="Standard" colour="210">' +
   '     <block type="controls_if"></block>' +
   '     <block type="controls_repeat_ext"></block>' +
   '     <block type="logic_compare"></block>' +
   '     <block type="math_number"></block>' +
   '     <block type="math_arithmetic"></block>' +
   '     <block type="text"></block>' +
   '     <block type="text_print"></block>' +
   '   </category>' +
   '</xml>';

var workspace = null;

function setupBlockly(onReady) {
  require.ensure(['./blockly'], function() {
    Blockly = require('./blockly');

    workspace = Blockly.inject('blocklyDiv',
                                   {
                                       toolbox: default_toolbox,
                                       media: "/static/blockly/",
                                       trashcan: true,
                                       zoom:
                                           {controls: true,
                                               wheel: true,
                                               startScale: 1.0,
                                               maxScale: 3,
                                               minScale: 0.3,
                                               scaleSpeed: 1.2},
                                   });

    workspace.addChangeListener(function() {
      var code = Blockly.JavaScript.workspaceToCode(workspace);

      var omitBlockIds = true;

      var xml = Blockly.Xml.workspaceToDom(workspace, omitBlockIds);

      var text = Blockly.Xml.domToPrettyText(xml);

      code = '// Generated file - DO NOT EDIT!\n' +
        code + '\n' + BLOCKS_MARKER + text.replace(/\*\//g, '*<!-- -->/') + '\n*/\n';

      textEditor.setContent(code);
    });

    $.getScript('/ide-ext/index.js').always(function() {
      onTextChanged();
      onReady();
    });
  });
}

function onTextChanged() {
  console.log('text changed', textEditor.getContent());
  var text = textEditor.getContent().split(BLOCKS_MARKER)[1];
  if (text) {
    text = text.replace(/\*\//g, '');
    var xml = Blockly.Xml.textToDom(text);
    workspace.clear();
    Blockly.Xml.domToWorkspace(xml, workspace);
  }
};

textEditor.onLoad(function(content) {
  if(content.indexOf(BLOCKS_MARKER) >= 0) {
    setBlocklyVisible(true);
  }
});

function onResize() {
  var blocklyArea = $('#editor')[0];
  var blocklyDiv = $('#blocklyDiv')[0];
  blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
  blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';

  Blockly.svgResize(workspace);
}

var blocklyVisible = false;

$('#toggleBlocksButton').click(function () {
  setBlocklyVisible(!blocklyVisible);
});

function setBlocklyVisible(visible) {
  if(visible != blocklyVisible) {
    if(!visible) {
      $(window).off('resize', onResize);

      $('#editor').css('visibility', 'visible');
      $('#blocklyDiv').css('visibility', 'hidden');
    } else {
      if(!Blockly) {
        setupBlockly(function() {
          setBlocklyVisible(true);
        });
        return;
      }

      $('#editor').css('visibility', 'hidden');
      $('#blocklyDiv').css('visibility', 'visible');

      onTextChanged();

      $(window).on('resize', onResize);
      onResize();
    }
    workspace.setVisible(visible);
    blocklyVisible = visible;
  }
}
