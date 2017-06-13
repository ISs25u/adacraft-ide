require('./editfile_ace.js');

var Blockly = require('./blockly');

var workspace = Blockly.inject('blocklyDiv',
                               {
                                   toolbox: document.getElementById('toolbox'),
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
