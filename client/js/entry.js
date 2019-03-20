var $ = require('jquery');
var textEditor = require('./editfile_ace.js');
var Blockly = null;

var BLOCKS_MARKER = '/* Blocks\n';

var full_toolbox =
'<xml>' +
'    <category name="Drone" colour="10">' +
'        <block type="drone"></block>' +
'        <block type="drone_move">' +
'          <value name="number">' +
'            <shadow type="math_number">' +
'              <field name="NUM">1</field>' +
'            </shadow>' +
'          </value>' +
'        </block>' +
'        <block type="drone_turn"></block>' +
'        <block type="drone_chkpt"></block>' +
'    </category>' +
'    <category name="Modules" colour="40">' +
'        <block type="mprocedure"></block>' +
'        <block type="mprocedure_call"></block>' +
'    </category>' +
'    <category name="Construction" colour="60">' +
'        <block type="block"></block>' +
'        <block type="monoblock">' +
'          <value name="material">' +
'            <shadow type="block">' +
'              <field name="material">\'1\'</field>' +
'            </shadow>' +
'          </value>' +
'        </block>' +
'        <block type="objects"></block>' +
'        <block type="animals"></block>' +
'        <block type="rectangle">' +
'          <value name="width">' +
'            <shadow type="math_number">' +
'              <field name="NUM">5</field>' +
'            </shadow>' +
'          </value>' +
'          <value name="lenght">' +
'            <shadow type="math_number">' +
'              <field name="NUM">5</field>' +
'            </shadow>' +
'          </value>' +
'          <value name="height">' +
'            <shadow type="math_number">' +
'              <field name="NUM">5</field>' +
'            </shadow>' +
'          </value>' +
'          <value name="material">' +
'            <shadow type="block">' +
'              <field name="material">\'1\'</field>' +
'            </shadow>' +
'          </value>' +
'        </block>' +
'        <block type="cylinder">' +
'          <value name="radius">' +
'            <shadow type="math_number">' +
'              <field name="NUM">4</field>' +
'            </shadow>' +
'          </value>' +
'          <value name="height">' +
'            <shadow type="math_number">' +
'              <field name="NUM">1</field>' +
'            </shadow>' +
'          </value>' +
'          <value name="material">' +
'            <shadow type="block">' +
'              <field name="material">\'1\'</field>' +
'            </shadow>' +
'          </value>' +
'        </block>' +
'        <block type="sphere">' +
'          <value name="radius">' +
'            <shadow type="math_number">' +
'              <field name="NUM">4</field>' +
'            </shadow>' +
'          </value>' +
'          <value name="material">' +
'            <shadow type="block">' +
'              <field name="material">\'1\'</field>' +
'            </shadow>' +
'          </value>' +
'        </block>' +
'    </category>' +
'    <sep></sep>' +
'    <category name="Logique" colour="210">' +
'        <block type="controls_if"></block>' +
'        <block type="logic_compare"></block>' +
'        <block type="logic_operation"></block>' +
'        <block type="logic_negate"></block>' +
'        <block type="logic_boolean"></block>' +
'        <block type="logic_null"></block>' +
'        <block type="logic_ternary"></block>' +
'    </category>' +
'    <category name="Boucles" colour="120">' +
'        <block type="controls_repeat_ext">' +
'            <value name="TIMES">' +
'                <shadow type="math_number">' +
'                    <field name="NUM">10</field>' +
'                </shadow>' +
'            </value>' +
'        </block>' +
'        <block type="controls_whileUntil"></block>' +
'        <block type="controls_for">' +
'            <value name="FROM">' +
'                <shadow type="math_number">' +
'                    <field name="NUM">1</field>' +
'                </shadow>' +
'            </value>' +
'            <value name="TO">' +
'                <shadow type="math_number">' +
'                    <field name="NUM">10</field>' +
'                </shadow>' +
'            </value>' +
'            <value name="BY">' +
'                <shadow type="math_number">' +
'                    <field name="NUM">1</field>' +
'                </shadow>' +
'            </value>' +
'        </block>' +
'        <block type="controls_flow_statements"></block>' +
'    </category>' +
'    <category name="Maths" colour="230">' +
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
'                <shadow type="math_number">' +
'                    <field name="NUM">1</field>' +
'                </shadow>' +
'            </value>' +
'            <value name="HIGH">' +
'                <shadow type="math_number">' +
'                    <field name="NUM">100</field>' +
'                </shadow>' +
'            </value>' +
'        </block>' +
'        <block type="math_random_int">' +
'            <value name="FROM">' +
'                <shadow type="math_number">' +
'                    <field name="NUM">1</field>' +
'                </shadow>' +
'            </value>' +
'            <value name="TO">' +
'                <shadow type="math_number">' +
'                    <field name="NUM">100</field>' +
'                </shadow>' +
'            </value>' +
'        </block>' +
'        <block type="math_random_float"></block>' +
'    </category>' +
'    <sep></sep>' +
'    <category name="Listes" colour="270">' +
'        <block type="lists_create_empty"></block>' +
'        <block type="lists_create_with"></block>' +
'        <block type="lists_repeat">' +
'            <value name="NUM">' +
'                <shadow type="math_number">' +
'                    <field name="NUM">5</field>' +
'                </shadow>' +
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
'    <category name="Variables" colour="330" custom="VARIABLE">' +
'    </category>' +
'</xml>';

var workspace = null;

function setupBlockly(onReady) {
  require.ensure(['./blockly'], function() {
    Blockly = require('./blockly');

    require('./fr_custom.js');
    require('./customblocks.js');
    require('./customblocks-javascript-generator.js');
    require('./fr.js');
    
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
                                       grid:
                                            {spacing: 40,
                                             length: 5,
                                             colour: '#aaa',
                                             snap: true},
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

    onTextChanged();
    onReady();

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
