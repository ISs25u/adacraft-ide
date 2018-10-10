var blockly = require('imports-loader?this=>window!exports-loader?Blockly,goog!blockly/blockly_compressed.js');

window.Blockly = blockly.Blockly;
window.goog = blockly.goog;

require('imports-loader?this=>window!blockly/blocks_compressed.js');
require('imports-loader?this=>window!blockly/javascript_compressed.js');
require('imports-loader?this=>window!blockly/msg/js/en.js');
// require('imports-loader?this=>window!customblocks.js');
// require('imports-loader?this=>window!customblocks-javascript-generator.js');
// require('imports-loader?this=>window!fr_1.js');
// require('imports-loader?this=>window!fr_2.js');

module.exports = blockly.Blockly;
