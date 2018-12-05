/************************************************************************
## Blockly -> ScriptCraft Javascript Code generator
Lauro Canonica: Original author (Devoxx4kids Lugano 2015.04)

Contains the generator for the javascript used in scriptcraft

***/

Blockly.JavaScript['drone'] = function (block) {
    var fname = block.getFieldValue('param');
    var statements_statements = Blockly.JavaScript.statementToCode(block, 'statements');
    var code = "exports." + fname + " = function ( player ) {\n  var theDrone = new Drone(player);\n  theDrone.chkpt('start');\n";
    code = code + "  var timeoutStop = new Date().getTime()+500;\n"; // set maximum run time for a script
    code = code + statements_statements;
    code = code + "};";
    return code;
};

Blockly.JavaScript['drone_turn'] = function (block) {
    var dropdown_direction = block.getFieldValue('direction');
    var code = "theDrone." + dropdown_direction + ";\n";
    return code;
};

Blockly.JavaScript['drone_move'] = function (block) {
    var number = Blockly.JavaScript.valueToCode(block, 'number', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_direction = block.getFieldValue('direction');
    var code = "theDrone." + dropdown_direction + "(" + number  + ")" + ";\n";
    return code;
};

Blockly.JavaScript['drone_chkpt'] = function (block) {
    var where = block.getFieldValue('where');
    var dropdown_direction = block.getFieldValue('direction');
    var code = "theDrone." + dropdown_direction + "(\"" + where  + "\")" + ";\n";
    return code;
};

Blockly.JavaScript['monoblock'] = function (block) {
    var material = Blockly.JavaScript.valueToCode(block,
                                                 'material',
                                                 Blockly.JavaScript.ORDER_ADDITION) || '1';
                                                 
    var code = "theDrone." + "box(" + material + ");\n";
    return code;
};

Blockly.JavaScript['block'] = function (block) {
    var dropdown_material = block.getFieldValue('material');
    var code = "" + dropdown_material + "";
    return [code, Blockly.JavaScript.ORDER_ADDITION];
};

Blockly.JavaScript['animals'] = function (block) {
    var dropdown_animal = block.getFieldValue('animal');
    var code = "theDrone.getLocation().world.spawnEntity(theDrone.getLocation(), org.bukkit.entity.EntityType." + dropdown_animal + ");\n";
    return code;
};

Blockly.JavaScript['rectangle'] = function (block) {
    
    var code = "";
    
    var value_width = Blockly.JavaScript.valueToCode(block, 'width', Blockly.JavaScript.ORDER_ATOMIC);
    var value_lenght = Blockly.JavaScript.valueToCode(block, 'lenght', Blockly.JavaScript.ORDER_ATOMIC);
    var value_height = Blockly.JavaScript.valueToCode(block, 'height', Blockly.JavaScript.ORDER_ATOMIC);
    
    var material = Blockly.JavaScript.valueToCode(block,
                                                 'material',
                                                 Blockly.JavaScript.ORDER_ADDITION) || '1';
    var dropdown_fill = block.getFieldValue('FILL');

    if(value_width * value_lenght * value_height > 50*50*50){
        code = "echo(\"Structure trop grande pour être construite...\");\n";
    } else {
        code = "theDrone." + dropdown_fill + "(" + material + "," + value_width + "," + value_height + "," + value_lenght + ");\n";
    }
    
    return code;
};

Blockly.JavaScript['cylinder'] = function (block) {
    
    var code=  "";
    
    var value_radius = Blockly.JavaScript.valueToCode(block, 'radius', Blockly.JavaScript.ORDER_ATOMIC);
    var value_height = Blockly.JavaScript.valueToCode(block, 'height', Blockly.JavaScript.ORDER_ATOMIC);
    var material = Blockly.JavaScript.valueToCode(block,
                                                 'material',
                                                 Blockly.JavaScript.ORDER_ADDITION) || '1';
    var dropdown_fill = block.getFieldValue('FILL');
    
    if(value_height*3.141592*value_radius*value_radius > 50*50*50){
        code = "echo(\"Structure trop grande pour être construite...\");\n";
    } else {
        code = "theDrone." + dropdown_fill + "(" + material + "," + value_radius + "," + value_height + ");\n";
    }
    
    return code;
};

Blockly.JavaScript['sphere'] = function (block) {
    
    var code=  "";
    
    var value_radius = Blockly.JavaScript.valueToCode(block, 'radius', Blockly.JavaScript.ORDER_ATOMIC);
    var material = Blockly.JavaScript.valueToCode(block,
                                                 'material',
                                                 Blockly.JavaScript.ORDER_ADDITION) || '1';
    var dropdown_fill = block.getFieldValue('FILL');
    
    if(4.0/3.0*3.141592*value_radius*value_radius*value_radius > 50*50*50){
        code = "echo(\"Structure trop grande pour être construite...\");\n";
    } else {
        code = "theDrone." + dropdown_fill + "(" + material + "," + value_radius + ");\n";
    }
    
    return code;
};

Blockly.JavaScript['objects'] = function (block) {
    
    var object = block.getFieldValue('OBJECT');
    
    var code = "theDrone." + object + ";\n";
    
    return code;
};


