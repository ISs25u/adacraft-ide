//var fs = require('fs');
var Schematic = require('minecraft-schematic');
var Adacraft = Adacraft || {};

Adacraft.schematic.loadFile = function(){}

	Schematic.loadSchematic(data, function(error, build) {
		    if (error) throw error;
		build.getWidth();
		build.getLength();
		build.getHeight();
});
