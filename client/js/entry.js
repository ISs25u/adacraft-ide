var textEditor = require('./editfile_ace.js');

var Blockly = require('./blockly');

var BLOCKS_MARKER = '/* Blocks\n';

var default_toolbox = `
<xml>
  <category name="Standard blocks">
    <block type="controls_if"></block>
    <block type="controls_repeat_ext"></block>
    <block type="logic_compare"></block>
    <block type="math_number"></block>
    <block type="math_arithmetic"></block>
    <block type="text"></block>
    <block type="text_print"></block>
  </category>
</xml>
`;

var workspace = Blockly.inject('blocklyDiv',
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

textEditor.onLoad(function(code) {
  var text = code.split(BLOCKS_MARKER)[1];
  if (text) {
    text = text.replace(/\*\//g, '');
    var xml = Blockly.Xml.textToDom(text);
    workspace.clear();
    Blockly.Xml.domToWorkspace(xml, workspace);
  }
});
