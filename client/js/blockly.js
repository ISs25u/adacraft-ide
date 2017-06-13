var blockly = require('imports-loader?this=>window!exports-loader?Blockly,goog!blockly/blockly_compressed.js');

window.Blockly = blockly.Blockly;
window.goog = blockly.goog;

require('imports-loader?this=>window!blockly/blocks_compressed.js');
require('imports-loader?this=>window!blockly/msg/js/en.js');

module.exports = blockly.Blockly;
