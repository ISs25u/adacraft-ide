var MSG = {
    title: "BlocklyCraft",
    blocks: "Blocks",
    linkTooltip: "Save and link to blocks.",
    deployTooltip: "Deploy the program defined by the blocks in the workspace.",
    badCode: "Program error:\n%1",
    timeout: "Maximum execution iterations exceeded.",
    trashTooltip: "Discard all blocks.",
    catLogic: "Logic",
    catLoops: "Loops",
    catMath: "Math",
    catText: "Text",
    catLists: "Lists",
    catColour: "Colour",
    catVariables: "Variables",
    catDrone: "Drone",
    catInventory: "Inventory",
    listVariable: "list",
    textVariable: "text",
    httpRequestError: "There was a problem with the request.",
    linkAlert: "Share your blocks with this link:\n\n%1",
    hashError: "Sorry, '%1' doesn't correspond with any saved program.",
    xmlError: "Could not load your saved file. Perhaps it was created with a different version of Blockly?",
    badXml: "Error parsing XML:\n%1\n\nSelect 'OK' to abandon your changes or 'Cancel' to further edit the XML."
};

Blockly.Msg.DRONE = "Drone";
Blockly.Msg.MATERIALS = "Blocks";
Blockly.Msg.MOUVEMENT = "Mouvement";
Blockly.Msg.RECTANGLE = "Rectangle";
Blockly.Msg.DELETE = "Supprimer";
Blockly.Msg.CIRCLE = "Cercle";
Blockly.Msg.WIDTH = "Largeur";
Blockly.Msg.HEIGHT = "Hauteur";
Blockly.Msg.LENGTH = "Longueur";
Blockly.Msg.RADIUS = "Rayon";
Blockly.Msg.FULL = "plein";
Blockly.Msg.EMPTY = "vide";
Blockly.Msg.INVENTORY = "Inventaire";
Blockly.Msg.ITEMS_TOOLS = "Outils";
Blockly.Msg.ITEMS_FOOD = "Nourriture";
Blockly.Msg.ITEMS_TRANSPORTATION = "Transports";
Blockly.Msg.ITEMS_WEAPONS_ARMOR = "Armes et armures";
Blockly.Msg.ANIMALS = "Animaux";
Blockly.Msg.MOUVEMENT_UP = "haut";
Blockly.Msg.MOUVEMENT_DOWN = "bas";
Blockly.Msg.MOUVEMENT_FWD = "avance";
Blockly.Msg.MOUVEMENT_BACK = "recule";
Blockly.Msg.MOUVEMENT_RIGHT = "droite";
Blockly.Msg.MOUVEMENT_LEFT = "gauche";
Blockly.Msg.MOUVEMENT_TURN_RIGHT = "tourne >";
Blockly.Msg.MOUVEMENT_TURN_LEFT = "tourne <";
Blockly.Msg.MOUVEMENT_BACKTOSTART = "revenir au lieu";
Blockly.Msg.MOUVEMENT_SAVESTART = "sauvegarder ce lieu";

Blockly.Msg.DEPLOY_SUCCESS = "Perfect, now you can test your command in Minecraft";
Blockly.Msg.MISSING_NAME = "Your command doesn't have a name.";

Blockly.Msg.TOOLTIP_DRONE = "Construct a Drone Object";
Blockly.Msg.TOOLTIP_MATERIALS = "Naturally generated and created material blocks.";
Blockly.Msg.TOOLTIP_ANIMALS = "Spawn passive and pameable animals.";
Blockly.Msg.TOOLTIP_DRONEMOVE = "Control the Drone's movement using any of the following methods.";
Blockly.Msg.TOOLTIP_RECTANGLE = "'A convenience method for building things.'";
Blockly.Msg.TOOLTIP_CIRCLE = "A convenience method for building cylinders. Building begins radius blocks to the right and forward.";
Blockly.Msg.TOOLTIP_DELETE = "A convenience method to delete things or areas.";
Blockly.Msg.TOOLTIP_INVENTORY = "Provides functions to add items to, remove items from and check the contents of a player's inventory";
Blockly.Msg.TOOLTIP_TOOLS = "Tools are items used by the player while held to perform actions faster and more efficiently.";
Blockly.Msg.TOOLTIP_FOOD = "Foods are consumable items that when eaten restore hunger points and sometimes cause status effects.";
Blockly.Msg.TOOLTIP_TRANSPORTATION = "Transportation involves the methods by which players move around the world.";
Blockly.Msg.TOOLTIP_WEAPONS_ARMOR = "Armor is used to reduce damage from mobs, players, lava, and explosions. Weapons are mostly used to kill mobs and players faster strategically.";

Blockly.Msg.ANIMALS_NAMES = []; // init blocks array
Blockly.Msg.ANIMALS_NAMES.BAT = 'Chauve-Souris';
Blockly.Msg.ANIMALS_NAMES.CHICKEN = 'Poule';
Blockly.Msg.ANIMALS_NAMES.COW = 'Vache';
Blockly.Msg.ANIMALS_NAMES.PIG = 'Cochon';
Blockly.Msg.ANIMALS_NAMES.RABBIT = 'Lapin';
Blockly.Msg.ANIMALS_NAMES.WOLF = 'Loup';
Blockly.Msg.ANIMALS_NAMES.SHEEP = 'Mouton';
Blockly.Msg.ANIMALS_NAMES.HORSE = 'Cheval';
Blockly.Msg.ANIMALS_NAMES.OCELOT = 'Ocelot';


Blockly.Msg.ITEMS_NAMES = []; // init items array
//tools
Blockly.Msg.ITEMS_NAMES.diamondAxe = "Diamond Axe";
Blockly.Msg.ITEMS_NAMES.diamondHoe = "Diamond Hoe";
Blockly.Msg.ITEMS_NAMES.diamondSpade = "Diamond Shovel";
Blockly.Msg.ITEMS_NAMES.diamondPickaxe = "Diamond Pickaxe";
Blockly.Msg.ITEMS_NAMES.shears = "Shears";
Blockly.Msg.ITEMS_NAMES.flintAndSteel = "Flint and Steel";
Blockly.Msg.ITEMS_NAMES.fishingRod = "Fishing Rod";
Blockly.Msg.ITEMS_NAMES.bed = "Bed";
Blockly.Msg.ITEMS_NAMES.torch = "Torch";

//food
Blockly.Msg.ITEMS_NAMES.carrot = "Carrot";
Blockly.Msg.ITEMS_NAMES.potato = "Potatoe";
Blockly.Msg.ITEMS_NAMES.cocoa = "Cocoa Beans";
Blockly.Msg.ITEMS_NAMES.apple = "Apple";
Blockly.Msg.ITEMS_NAMES.melon = "Melon";
Blockly.Msg.ITEMS_NAMES.sugar = "Sugar";
Blockly.Msg.ITEMS_NAMES.milkBucket = "Milk bucket";
Blockly.Msg.ITEMS_NAMES.egg = "Egg";
Blockly.Msg.ITEMS_NAMES.wheat = "Wheat";
Blockly.Msg.ITEMS_NAMES.pumpkin = "Pumpkin";

//transportation
Blockly.Msg.ITEMS_NAMES.rails = "Rail";
Blockly.Msg.ITEMS_NAMES.minecart = "Minecart";
Blockly.Msg.ITEMS_NAMES.poweredRail = "Rail (Powered)";
Blockly.Msg.ITEMS_NAMES.redstoneTorchOn = "Redstone Torch (active)";

//weapons & armor
Blockly.Msg.ITEMS_NAMES.bow = "Bow";
Blockly.Msg.ITEMS_NAMES.arrow = "Arrow";
Blockly.Msg.ITEMS_NAMES.diamondBoots = "Diamond Boots";
Blockly.Msg.ITEMS_NAMES.diamondChestplate = "Diamond Chestplate";
Blockly.Msg.ITEMS_NAMES.diamondHelmet = "Diamond Helmet";
Blockly.Msg.ITEMS_NAMES.diamondLeggings = "Diamond Leggings";
Blockly.Msg.ITEMS_NAMES.tnt = "tnt";

Blockly.Msg.OBJNAMES = []; // init blocks array
Blockly.Msg.OBJNAMES[0]   = "Air";
Blockly.Msg.OBJNAMES[1]   = "Pierre lisse";
Blockly.Msg.OBJNAMES[3]   = "Terre";
Blockly.Msg.OBJNAMES[4]   = "Pierre";
Blockly.Msg.OBJNAMES[5]   = "Chêne";
Blockly.Msg.OBJNAMES[6]   = "Pousse de chêne";
Blockly.Msg.OBJNAMES[8]   = "Eau";
Blockly.Msg.OBJNAMES[10]  = "Lave";
Blockly.Msg.OBJNAMES[12]  = "Sable";
Blockly.Msg.OBJNAMES[13]  = "Gravier";
Blockly.Msg.OBJNAMES[14]  = "Minnerai or";
Blockly.Msg.OBJNAMES[15]  = "Minnerai fer";
Blockly.Msg.OBJNAMES[16]  = "Minerrai charbon";
Blockly.Msg.OBJNAMES[17]  = "Bois";
Blockly.Msg.OBJNAMES[18]  = "Feuilles";
Blockly.Msg.OBJNAMES[19]  = "Éponge";
Blockly.Msg.OBJNAMES[20]  = "Verre";
Blockly.Msg.OBJNAMES[21]  = "Minnerai lapis lazuli";
Blockly.Msg.OBJNAMES[22]  = "Bloc de lapis lazuli";
Blockly.Msg.OBJNAMES[23]  = "Distributeur";
Blockly.Msg.OBJNAMES[24]  = "Pierre de sable";
Blockly.Msg.OBJNAMES[25]  = "Note";
Blockly.Msg.OBJNAMES[26]  = "Lit";
Blockly.Msg.OBJNAMES[29]  = "Piston collant";
Blockly.Msg.OBJNAMES[30]  = "Toile d'araignÃe";
Blockly.Msg.OBJNAMES[33]  = "Piston";
Blockly.Msg.OBJNAMES[34]  = "Piston extn";
Blockly.Msg.OBJNAMES[35]  = "Laine blanche";
Blockly.Msg.OBJNAMES[41]  = "Or";
Blockly.Msg.OBJNAMES[42]  = "Fer";
Blockly.Msg.OBJNAMES[43]  = "Double slab stone";
Blockly.Msg.OBJNAMES[45]  = "Brique rouge";
Blockly.Msg.OBJNAMES[46]  = "Tnt";
Blockly.Msg.OBJNAMES[48]  = "Pierre moussue";
Blockly.Msg.OBJNAMES[49]  = "Obsidienne";
Blockly.Msg.OBJNAMES[50]  = "Torche";
Blockly.Msg.OBJNAMES[52]  = "Générateur de monstres";
Blockly.Msg.OBJNAMES[53]  = "Escaliers de chêne";
Blockly.Msg.OBJNAMES[67]  = "Escaliers de chêne";
Blockly.Msg.OBJNAMES[54]  = "Coffre";
Blockly.Msg.OBJNAMES[56]  = "Minnerai diamant";
Blockly.Msg.OBJNAMES[57]  = "Diamond";
Blockly.Msg.OBJNAMES[58]  = "Crafting table";
Blockly.Msg.OBJNAMES[59]  = "Wheat seeds";
Blockly.Msg.OBJNAMES[60]  = "Farmland";
Blockly.Msg.OBJNAMES[61]  = "Furnace";
Blockly.Msg.OBJNAMES[62]  = "Furnace burning";
Blockly.Msg.OBJNAMES[63]  = "Sign post";
Blockly.Msg.OBJNAMES[64]  = "Door wood";
Blockly.Msg.OBJNAMES[65]  = "Echelle";
Blockly.Msg.OBJNAMES[66]  = "Rail";
Blockly.Msg.OBJNAMES[68]  = "Sign";
Blockly.Msg.OBJNAMES[69]  = "Lever";
Blockly.Msg.OBJNAMES[70]  = "Pressure plate stone";
Blockly.Msg.OBJNAMES[71]  = "Door iron";
Blockly.Msg.OBJNAMES[72]  = "Pressure plate wood";
Blockly.Msg.OBJNAMES[73]  = "Minnerai redstone";
Blockly.Msg.OBJNAMES[74]  = "Redstone ore glowing";
Blockly.Msg.OBJNAMES[75]  = "Torch redstone";
Blockly.Msg.OBJNAMES[76]  = "Torch redstone active";
Blockly.Msg.OBJNAMES[77]  = "Stone button";
Blockly.Msg.OBJNAMES[78]  = "Slab snow";
Blockly.Msg.OBJNAMES[79]  = "Glace";
Blockly.Msg.OBJNAMES[80]  = "Neige";
Blockly.Msg.OBJNAMES[81]  = "Cactus";
Blockly.Msg.OBJNAMES[82]  = "Craie";
Blockly.Msg.OBJNAMES[84]  = "Jukebox";
Blockly.Msg.OBJNAMES[86]  = "Citrouille";
Blockly.Msg.OBJNAMES[87]  = "Netherrack";
Blockly.Msg.OBJNAMES[88]  = "Soulsand";
Blockly.Msg.OBJNAMES[89]  = "Glowstone";
Blockly.Msg.OBJNAMES[90]  = "Netherportal";
Blockly.Msg.OBJNAMES[91]  = "Jackolantern";
Blockly.Msg.OBJNAMES[92]  = "Cake";
Blockly.Msg.OBJNAMES[94]  = "Redstone repeater active";
Blockly.Msg.OBJNAMES[96]  = "Trapdoor";
Blockly.Msg.OBJNAMES[97]  = "Monster egg";
Blockly.Msg.OBJNAMES[98]  = "Brick stone";
Blockly.Msg.OBJNAMES[101] = "Iron bars";
Blockly.Msg.OBJNAMES[102] = "Glass pane";
Blockly.Msg.OBJNAMES[103] = "Melon";
Blockly.Msg.OBJNAMES[104] = "Pumpkin stem";
Blockly.Msg.OBJNAMES[105] = "Melon stem";
Blockly.Msg.OBJNAMES[107] = "Fence gate";
Blockly.Msg.OBJNAMES[112] = "Nether";
Blockly.Msg.OBJNAMES[113] = "Nether fence";
Blockly.Msg.OBJNAMES[115] = "Netherwart";
Blockly.Msg.OBJNAMES[116] = "Table enchantment";
Blockly.Msg.OBJNAMES[117] = "Brewing stand";
Blockly.Msg.OBJNAMES[118] = "Cauldron";
Blockly.Msg.OBJNAMES[119] = "Endportal";
Blockly.Msg.OBJNAMES[120] = "Endportal frame";
Blockly.Msg.OBJNAMES[121] = "Endstone";
Blockly.Msg.OBJNAMES[122] = "Dragon egg";
Blockly.Msg.OBJNAMES[123] = "Redstone lamp";
Blockly.Msg.OBJNAMES[124] = "Redstone lamp active";
Blockly.Msg.OBJNAMES[126] = "Slab oak";
Blockly.Msg.OBJNAMES[127] = "Cocoa";
Blockly.Msg.OBJNAMES[129] = "Minnerai emeraude";
Blockly.Msg.OBJNAMES[130] = "Enderchest";
Blockly.Msg.OBJNAMES[131] = "Tripwire hook";
Blockly.Msg.OBJNAMES[132] = "Tripwire";
Blockly.Msg.OBJNAMES[133] = "Emerald";
Blockly.Msg.OBJNAMES[137] = "Command";
Blockly.Msg.OBJNAMES[138] = "Beacon";
Blockly.Msg.OBJNAMES[140] = "Flowerpot";
Blockly.Msg.OBJNAMES[141] = "Carrots";
Blockly.Msg.OBJNAMES[142] = "Potatoes";
Blockly.Msg.OBJNAMES[152] = "Redstone";
Blockly.Msg.OBJNAMES[153] = "Netherquartzore";
Blockly.Msg.OBJNAMES[155] = "Quartz";
Blockly.Msg.OBJNAMES[162] = "Bois acacia";
Blockly.Msg.OBJNAMES[172] = "Craie compacte";
Blockly.Msg.OBJNAMES[173] = "Coal block";
Blockly.Msg.OBJNAMES[174] = "Glace comptacte";
