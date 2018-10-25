/************************************************************************
## Blockly -> ScriptCraft Javascript Code generator
Lauro Canonica: Original author (Devoxx4kids Lugano 2015.04)

Contains the generator for the javascript used in scriptcraft

***/

Blockly.JavaScript['drone'] = function (block) {
    var fname = block.getFieldValue('param');
    var statements_statements = Blockly.JavaScript.statementToCode(block, 'statements');
    var code = "exports." + fname + " = function ( player ) {\n  var theDrone = new Drone(player);\n  theDrone.chkpt('start');\n";
    code = code + "var timeoutStop = new Date().getTime()+500;\n"; // set maximum run time for a script
    code = code + statements_statements;
    code = code + "};";
    return code;
};

Blockly.JavaScript['drone_move'] = function (block) {
    var dropdown_direction = block.getFieldValue('direction');
    var code = "theDrone." + dropdown_direction + ";\n";
    return code;
};

Blockly.JavaScript['materials'] = function (block) {
    var dropdown_material = block.getFieldValue('material');
    var code = "theDrone." + 'box(' + dropdown_material + ');\n';
    return code;
};

Blockly.JavaScript['animals'] = function (block) {
    var dropdown_animal = block.getFieldValue('animal');
    var code = "if (__plugin.bukkit) {\n        theDrone.getLocation().world.spawnEntity(theDrone.getLocation(), org.bukkit.entity.EntityType." + dropdown_animal + ");\n    }\n    if (__plugin.canary) {\n        var Canary = Packages.net.canarymod.Canary,\n            entityInstance = Canary.factory().entityFactory.newEntity('" + dropdown_animal + "', theDrone.getLocation());\n        entityInstance.spawn();\n    }";
    return code;
};

Blockly.JavaScript['rectangle'] = function (block) {
    var value_width = Blockly.JavaScript.valueToCode(block, 'width', Blockly.JavaScript.ORDER_ATOMIC);
    var value_lenght = Blockly.JavaScript.valueToCode(block, 'lenght', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_material = block.getFieldValue('material');
    var dropdown_fill = block.getFieldValue('fill');
    var code = "theDrone.box" + dropdown_fill + "(" + dropdown_material + "," + value_width + ",1," + value_lenght + ");\n";
    return code;
};

Blockly.JavaScript['circle'] = function (block) {
    var value_radius = Blockly.JavaScript.valueToCode(block, 'radius', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_material = block.getFieldValue('material');
    var dropdown_fill = block.getFieldValue('fill');
    var code = "theDrone.cylinder" + dropdown_fill + "(" + dropdown_material + "," + value_radius + ",1);\n";
    return code;
};

Blockly.JavaScript['delete'] = function (block) {
    var value_width = Blockly.JavaScript.valueToCode(block, 'width', Blockly.JavaScript.ORDER_ATOMIC);
    var value_height = Blockly.JavaScript.valueToCode(block, 'height', Blockly.JavaScript.ORDER_ATOMIC);
    var value_lenght = Blockly.JavaScript.valueToCode(block, 'lenght', Blockly.JavaScript.ORDER_ATOMIC);
    var code = "theDrone.box(0," + value_width + "," + value_height + "," + value_lenght + ");\n";
    return code;
};

