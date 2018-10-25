var $ = require('jquery');
var textEditor = require('./editfile_ace.js');
var Blockly = null;

var BLOCKS_MARKER = '/* Blocks\n';

var full_toolbox =
'<xml>' +
'    <category name="Scriptcraft">' +
'        <block type="drone"></block>' +
'        <block type="animals"></block>' +
'        <block type="rectangle"></block>' +
'        <block type="circle"></block>' +
'        <block type="delete"></block>' +
'        <block type="drone_move"></block>' +
'        <block type="materials"></block>' +
'    </category>' +
'    <category name="Logique">' +
'        <block type="controls_if"></block>' +
'        <block type="logic_compare"></block>' +
'        <block type="logic_operation"></block>' +
'        <block type="logic_negate"></block>' +
'        <block type="logic_boolean"></block>' +
'        <block type="logic_null"></block>' +
'        <block type="logic_ternary"></block>' +
'    </category>' +
'    <category name="Boucles">' +
'        <block type="controls_repeat_ext">' +
'            <value name="TIMES">' +
'                <block type="math_number">' +
'                    <field name="NUM">10</field>' +
'                </block>' +
'            </value>' +
'        </block>' +
'        <block type="controls_whileUntil"></block>' +
'        <block type="controls_for">' +
'            <value name="FROM">' +
'                <block type="math_number">' +
'                    <field name="NUM">1</field>' +
'                </block>' +
'            </value>' +
'            <value name="TO">' +
'                <block type="math_number">' +
'                    <field name="NUM">10</field>' +
'                </block>' +
'            </value>' +
'            <value name="BY">' +
'                <block type="math_number">' +
'                    <field name="NUM">1</field>' +
'                </block>' +
'            </value>' +
'        </block>' +
'        <block type="controls_flow_statements"></block>' +
'    </category>' +
'    <category name="Maths">' +
'        <block type="math_number"></block>' +
'        <block type="math_arithmetic"></block>' +
'        <block type="math_single"></block>' +
'        <block type="math_trig"></block>' +
'        <block type="math_constant"></block>' +
'        <block type="math_number_property"></block>' +
'        <block type="math_change">' +
'            <value name="DELTA">' +
'                <block type="math_number">' +
'                    <field name="NUM">1</field>' +
'                </block>' +
'            </value>' +
'        </block>' +
'        <block type="math_round"></block>' +
'        <block type="math_on_list"></block>' +
'        <block type="math_modulo"></block>' +
'        <block type="math_constrain">' +
'            <value name="LOW">' +
'                <block type="math_number">' +
'                    <field name="NUM">1</field>' +
'                </block>' +
'            </value>' +
'            <value name="HIGH">' +
'                <block type="math_number">' +
'                    <field name="NUM">100</field>' +
'                </block>' +
'            </value>' +
'        </block>' +
'        <block type="math_random_int">' +
'            <value name="FROM">' +
'                <block type="math_number">' +
'                    <field name="NUM">1</field>' +
'                </block>' +
'            </value>' +
'            <value name="TO">' +
'                <block type="math_number">' +
'                    <field name="NUM">100</field>' +
'                </block>' +
'            </value>' +
'        </block>' +
'        <block type="math_random_float"></block>' +
'    </category>' +
'    <sep></sep>' +
'    <category name="Texte">' +
'        <block type="text"></block>' +
'        <block type="text_join"></block>' +
'        <block type="text_append">' +
'            <value name="TEXT">' +
'                <block type="text"></block>' +
'            </value>' +
'        </block>' +
'        <block type="text_length"></block>' +
'        <block type="text_isEmpty"></block>' +
'        <block type="text_indexOf">' +
'            <value name="VALUE">' +
'                <block type="variables_get">' +
'                    <field name="VAR" class="textVar">...</field>' +
'                </block>' +
'            </value>' +
'        </block>' +
'        <block type="text_charAt">' +
'            <value name="VALUE">' +
'                <block type="variables_get">' +
'                    <field name="VAR" class="textVar">...</field>' +
'                </block>' +
'            </value>' +
'        </block>' +
'        <block type="text_getSubstring">' +
'            <value name="STRING">' +
'                <block type="variables_get">' +
'                    <field name="VAR" class="textVar">...</field>' +
'                </block>' +
'            </value>' +
'        </block>' +
'        <block type="text_changeCase"></block>' +
'        <block type="text_trim"></block>' +
'        <block type="text_print"></block>' +
'        <block type="text_prompt_ext">' +
'            <value name="TEXT">' +
'                <block type="text"></block>' +
'            </value>' +
'        </block>' +
'    </category>' +
'    <category name="Listes">' +
'        <block type="lists_create_empty"></block>' +
'        <block type="lists_create_with"></block>' +
'        <block type="lists_repeat">' +
'            <value name="NUM">' +
'                <block type="math_number">' +
'                    <field name="NUM">5</field>' +
'                </block>' +
'            </value>' +
'        </block>' +
'        <block type="lists_length"></block>' +
'        <block type="lists_isEmpty"></block>' +
'        <block type="lists_indexOf">' +
'            <value name="VALUE">' +
'                <block type="variables_get">' +
'                    <field name="VAR" class="listVar">...</field>' +
'                </block>' +
'            </value>' +
'        </block>' +
'        <block type="lists_getIndex">' +
'            <value name="VALUE">' +
'                <block type="variables_get">' +
'                    <field name="VAR" class="listVar">...</field>' +
'                </block>' +
'            </value>' +
'        </block>' +
'        <block type="lists_setIndex">' +
'            <value name="LIST">' +
'                <block type="variables_get">' +
'                    <field name="VAR" class="listVar">...</field>' +
'                </block>' +
'            </value>' +
'        </block>' +
'        <block type="lists_getSublist">' +
'            <value name="LIST">' +
'                <block type="variables_get">' +
'                    <field name="VAR" class="listVar">...</field>' +
'                </block>' +
'            </value>' +
'        </block>' +
'        <block type="lists_split">' +
'            <value name="DELIM">' +
'                <block type="text">' +
'                    <field name="TEXT">,</field>' +
'                </block>' +
'            </value>' +
'        </block>' +
'    </category>' +
'    <category name="Variables" custom="VARIABLE">' +
'    </category>' +
'    <category name="Couleurs">' +
'    </category>' +
'</xml>';

var workspace = null;

function setupBlockly(onReady) {
  require.ensure(['./blockly'], function() {
    Blockly = require('./blockly');

    require('./fr.js');
    require('./customblocks.js');
    require('./customblocks-javascript-generator.js');

    workspace = Blockly.inject('blocklyDiv',
                                   {
                                       toolbox: full_toolbox,
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
