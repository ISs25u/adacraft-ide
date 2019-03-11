/************************************************************************
## Blockly-Minecraft blocks
Lauro Canonica: Original author (Devoxx4kids Lugano 2015.04)

Contains the description of the Minecraft blocks for Blockly

***/

//Naturally generated and created material blocks http://minecraft.gamepedia.com/Block 
//var materials = getObjNames(Blockly.Msg.OBJNAMES, [0, 1, 3, 4, 8, 10, 12, 13, 14, 15, 16, 17, 18, 20, 21, 24, 41, 49, 56, 65, 66, 73, 79, 80, 81, 82, 86, 103, 129, 152, 162, 172, 174]);
var materials = getObjNames(Blockly.Msg.OBJNAMES, [0,17,162,81,86,82,172,8,65,18,
                                                   79,174,13,10,'35:0','35:8',
                                                   '35:7','35:15','35:14','35:1',
                                                   '35:4','35:5','35:13','35:9',
                                                   '35:3','35:11','35:10','35:2',
                                                   '35:6','35:12',169,103,16,56,129,
                                                   15,21,14,73,80,49,41,4,24,1,
                                                   66,152,12,3,20]);



//Spawn passive and pameable animals http://minecraft.gamepedia.com/Mob
var animals = getObjNames(Blockly.Msg.ANIMALS_NAMES, ['BAT', 'CHICKEN', 'COW', 'PIG', 'RABBIT', 'WOLF', 'SHEEP', 'HORSE', 'OCELOT']);

// extract objects translation names from their ids/names
function getObjNames(list, ids) {
    var shortList = [];
    var id = '';
    if (list === undefined) {
        //TODO - switch to english translation file in case of a non-existent translation
        for (i = 0; i < ids.length; i++) {
            id = '';
            if (typeof (ids[i]) == "number") {
                id = "'" + ids[i] + "'";
            } else {
                id = ids[i];
            }
            shortList[i] = [ids[i], id];
        }
    } else {
        for (i = 0; i < ids.length; i++) {
            id = '';
            if (typeof (ids[i]) == "number") {
                id = "'" + ids[i] + "'";
            } else {
                id = "'" + ids[i] + "'";
            }
            shortList[i] = [list[ids[i]], id];
        }
    }
    return shortList;
}

Blockly.Blocks['drone'] = {
    init: function () {
        this.appendStatementInput("statements")
            .setCheck("")
            .appendField("Programme")
            .appendField(new Blockly.FieldTextInput(""), "param");
        this.setInputsInline(true);
        this.setColour("#555555");
        this.setTooltip(Blockly.Msg.TOOLTIP_DRONE);
        this.setHelpUrl('https://github.com/walterhiggins/ScriptCraft/blob/master/docs/API-Reference.md#drone-plugin');
    }
};

Blockly.Blocks['drone_turn'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Tourner à")
            .appendField(
            new Blockly.FieldDropdown([
                ["⟳", "turn()"],
                ["⟲", "turn(3)"]
            ]), "direction");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(10);
        this.setTooltip(Blockly.Msg.TOOLTIP_DRONEMOVE);
        this.setHelpUrl('https://github.com/walterhiggins/ScriptCraft/blob/master/docs/API-Reference.md#drone-movement');
    }
};

Blockly.Blocks['drone_move'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.MOUVEMENT)
            .appendField(
            new Blockly.FieldDropdown([
                [Blockly.Msg.MOUVEMENT_UP, "up"],
                [Blockly.Msg.MOUVEMENT_DOWN, "down"],
                [Blockly.Msg.MOUVEMENT_FWD, "fwd"],
                [Blockly.Msg.MOUVEMENT_BACK, "back"],
                [Blockly.Msg.MOUVEMENT_RIGHT, "right"],
                [Blockly.Msg.MOUVEMENT_LEFT, "left"]
            ]), "direction");
        this.appendValueInput("number")
            .setCheck("Number")
        this.appendDummyInput()
            .appendField("fois");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(10);
        this.setTooltip(Blockly.Msg.TOOLTIP_DRONEMOVE);
        this.setHelpUrl('https://github.com/walterhiggins/ScriptCraft/blob/master/docs/API-Reference.md#drone-movement');
    }
};

Blockly.Blocks['drone_chkpt'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Position")
            .appendField(
            new Blockly.FieldDropdown([
                ["sauvegarder", "chkpt"],
                ["aller à", "move"]
            ]), "direction");
        this.appendDummyInput()
            .appendField("nom :");
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput(""), "where");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(10);
        this.setTooltip(Blockly.Msg.TOOLTIP_DRONEMOVE);
        this.setHelpUrl('https://github.com/walterhiggins/ScriptCraft/blob/master/docs/API-Reference.md#drone-movement');
    }
};

Blockly.Blocks['block'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(materials), "material");
    this.setOutput(true, 'Block');
    this.setColour(60);
    this.setTooltip('Returns a block.');
    this.setHelpUrl('http://www.w3schools.com/jsref/jsref_length_string.asp');
  }
};

Blockly.Blocks['monoblock'] = {
    init: function () {
        this.appendValueInput("material")
            .setCheck("Block")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Block");
        this.setInputsInline(false);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(60);
        this.setTooltip(Blockly.Msg.TOOLTIP_MATERIALS);
        this.setHelpUrl('http://minecraft.gamepedia.com/Block');
    }
};

Blockly.Blocks['animals'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Animal")
            .appendField(new Blockly.FieldDropdown(animals), "animal");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(60);
        this.setTooltip(Blockly.Msg.TOOLTIP_ANIMALS);
        this.setHelpUrl('https://github.com/walterhiggins/ScriptCraft/blob/master/docs/API-Reference.md#entities-module');
    }
};

Blockly.Blocks['rectangle'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Cube")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.FULL, "box"],
                [Blockly.Msg.EMPTY, "box0"]
            ]), "FILL");
        this.appendValueInput("width")
            .setCheck("Number")
            .appendField("Largeur");
        this.appendValueInput("lenght")
            .setCheck("Number")
            .appendField("Longueur");
        this.appendValueInput("height")
            .setCheck("Number")
            .appendField("Hauteur");
        this.appendValueInput("material")
            .setCheck("Block")
            .appendField("Matériau");
        this.setInputsInline(false);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(60);
        this.setTooltip(Blockly.Msg.TOOLTIP_RECTANGLE);
        this.setHelpUrl('https://github.com/walterhiggins/ScriptCraft/blob/master/docs/API-Reference.md#dronebox-method');
    }
};

Blockly.Blocks['cylinder'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Cylindre")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.FULL, "cylinder"],
                [Blockly.Msg.EMPTY, "cylinder0"]
            ]), "FILL");
        this.appendValueInput("radius")
            .setCheck("Number")
            .appendField("Rayon");
        this.appendValueInput("height")
            .setCheck("Number")
            .appendField("Hauteur");
        this.appendValueInput("material")
            .setCheck("Block")
            .appendField("Matériau");
        this.setInputsInline(false);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(60);
        this.setTooltip(Blockly.Msg.TOOLTIP_CIRCLE);
        this.setHelpUrl('https://github.com/walterhiggins/ScriptCraft/blob/master/docs/API-Reference.md#dronecylinder-method');
    }
};

Blockly.Blocks['sphere'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Sphere")
            .appendField(new Blockly.FieldDropdown([
                ["pleine", "sphere"],
                ["vide", "sphere0"]
            ]), "FILL");
        this.appendValueInput("radius")
            .setCheck("Number")
            .appendField("Rayon");
        this.appendValueInput("material")
            .setCheck("Block")
            .appendField("Matériau");
        this.setInputsInline(false);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(60);
        this.setTooltip(Blockly.Msg.TOOLTIP_CIRCLE);
        this.setHelpUrl('https://github.com/walterhiggins/ScriptCraft/blob/master/docs/API-Reference.md#dronecylinder-method');
    }
};


Blockly.Blocks['objects'] = {
    init: function () {
        
        var l_objects = [ ["Chène","oak()"],
                        ["Épicéa","spruce()"],
                        ["Bouleau","birch()"],
                        ["Jungle","jungle()"],
                        ["Porte simple (bois)","door()"],
                        ["Porte double (bois)","door2()"],
                        ["Porte simple (fer)", "door_iron()"],
                        ["Porte double (fer)", "door2_iron()"]];
    
        this.appendDummyInput()
            .appendField("Entité")
            .appendField(new Blockly.FieldDropdown(l_objects), "OBJECT");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(60);
        this.setTooltip("Poser des objets");
        this.setHelpUrl('https://github.com/walterhiggins/ScriptCraft/blob/master/docs/API-Reference.md#entities-module');
    }
};

Blockly.Blocks['mprocedure'] = {
    init: function () {
        this.appendStatementInput("statements")
            .setCheck("")
            .appendField("Module")
            .appendField(new Blockly.FieldTextInput(""), "param");
        this.setInputsInline(true);
        this.setColour("#af7358");
        this.setTooltip(Blockly.Msg.TOOLTIP_DRONE);
        this.setHelpUrl('https://github.com/walterhiggins/ScriptCraft/blob/master/docs/API-Reference.md#drone-plugin');
    }
};

Blockly.Blocks['mprocedure_call'] = {
    init: function () {
        this.appendDummyInput()
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput(""), "where");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour("#af7358");
        this.setTooltip(Blockly.Msg.TOOLTIP_DRONEMOVE);
        this.setHelpUrl('https://github.com/walterhiggins/ScriptCraft/blob/master/docs/API-Reference.md#drone-movement');
    }
};

