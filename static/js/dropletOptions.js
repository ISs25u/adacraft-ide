var dropletOptions = {
  mode: 'javascript',
  modeOptions: {
    blockFunctions: []
  },
  palette: [
    {
      name: 'Drone basics',
      color: 'blue',
      blocks: [
        {
          block: 'var drone = up(0);',
          title: 'Create drone where I look at'
        },
        {
          block: 'exports.myFunction = function(){\n\t\tvar drone = up(0);\n\t\t __ ;\n};',
          title: 'A function with a drone'
        },
        {
          block: 'var drone = new Drone(__);',
          title: 'Create a drone anywhere'
        },
      ]
    },
    {
      name: 'Drone moves',
      color: 'blue',
      blocks: [
        {
          block: 'drone.left(1);',
          title: 'Move left'
        },
        {
          block: 'drone.right(1);',
          title: 'Move right'
        },
        {
          block: 'drone.up(1);',
          title: 'Move up'
        },
        {
          block: 'drone.down(1);',
          title: 'Move down'
        },
        {
          block: 'drone.turn(1);',
          title: 'Turn right'
        },
        {
          block: 'drone.turn(2);',
          title: 'U turn'
        },
        {
          block: 'drone.turn(3);',
          title: 'Turn left'
        },
        {
          block: 'drone.chkpt("here");',
          title: 'Create checkpoint'
        },
        {
          block: 'drone.move("here");',
          title: 'Go to checkpoint'
        },
      ]
    }, {
      name: 'Drone shapes',
      color: 'blue',
      blocks: [
        {
          block: 'drone.box(blocks._,_,_,_)',
          title: 'Create a box'
        },
        {
          block: 'drone.box0(blocks._,_,_,_)',
          title: 'Create a hollow box'
        },
        {
          block: 'drone.cylinder(blocks._,_,_)',
          title: 'Create a cylinder'
        },
        {
          block: 'drone.cylinder0(blocks._,_,_)',
          title: 'Create a hollow cylinder'
        },
        {
          block: 'drone.prism(blocks._,_,_)',
          title: 'Create a prism'
        },
        {
          block: 'drone.prism0(blocks._,_,_)',
          title: 'Create a hollow prism'
        },
        {
          block: 'drone.sphere(blocks._,_)',
          title: 'Create a sphere'
        },
        {
          block: 'drone.sphere0(blocks._,_)',
          title: 'Create a hollow sphere'
        },
        ]
    }, {
      name: 'Drone fun',
      color: 'blue',
      blocks: [
        {
          block: 'drone.door()',
          title: 'Create a wooden door'
        },
        {
          block: 'drone.door2()',
          title: 'Create a wooden dooble door'
        },
        {
          block: 'drone.wallsign(["","","",""])',
          title: 'Create a sign on the wall'
        },
        {
          block: 'drone.signpost(["","","",""])',
          title: 'Create a freestanding sign'
        },
        {
          block: 'drone.oak()',
          title: 'Create a tree'
        },
        {
          block: 'drone.spruce()',
          title: 'Create a tree'
        },
        {
          block: 'drone.birch()',
          title: 'Create a tree'
        },
        {
          block: 'drone.jungle()',
          title: 'Create a tree'
        },
        {
          block: 'drone.cottage()',
          title: 'Build a home'
        },
        {
          block: 'drone.cottage_road()',
          title: 'Build a nice road with buildings and trees'
        },
        {
          block: 'drone.fort(_,_)',
          title: 'Build a mighty fort'
        },
        {
          block: 'drone.castle(_,_)',
          title: 'Build a even mighter castle'
        },
        {
          block: 'drone.temple(_)',
          title: 'Build a temple'
        },
        {
          block: 'drone.firework(_,_)',
          title: 'Launch a firework'
        },
        {
          block: 'drone.maze(_,_)',
          title: 'Build a maze'
        },
        {
          block: 'drone.garden(_,_)',
          title: 'Plant a garden'
        },
        {
          block: 'drone.door_iron()',
          title: 'Create a iron door'
        },
        {
          block: 'drone.door2_iron()',
          title: 'Create a iron double door'
        },
        ]
    }, {
      name: 'Control',
      color: 'orange',
      blocks: [
        {
          block: 'for (var i = 0; i < 4; i++) {\n  __;\n}',
          title: 'Do something multiple times'
        }, {
          block: 'if (__) {\n  __;\n}',
          title: 'Do something only if a condition is true'
        }, {
          block: 'if (__) {\n  __;\n} else {\n  __;\n}',
          title: 'Do something if a condition is true, otherwise do something else'
        }, {
          block: 'while (__) {\n  __;\n}',
          title: 'Repeat something while a condition is true'
        }
      ]
    }, {
      name: 'Math',
      color: 'green',
      blocks: [
        {
          block: 'var x = __;',
          title: 'Create a variable for the first time'
        }, {
          block: 'x = __;',
          title: 'Reassign a variable'
        }, {
          block: '__ + __',
          title: 'Add two numbers'
        }, {
          block: '__ - __',
          title: 'Subtract two numbers'
        }, {
          block: '__ * __',
          title: 'Multiply two numbers'
        }, {
          block: '__ / __',
          title: 'Divide two numbers'
        }, {
          block: '__ === __',
          title: 'Compare two numbers'
        }, {
          block: '__ > __',
          title: 'Compare two numbers'
        }, {
          block: '__ < __',
          title: 'Compare two numbers'
        }, {
          block: 'random(1, 100)',
          title: 'Get a random number in a range'
        }, {
          block: 'round(__)',
          title: 'Round to the nearest integer'
        }, {
          block: 'abs(__)',
          title: 'Absolute value'
        }, {
          block: 'max(__, __)',
          title: 'Absolute value'
        }, {
          block: 'min(__, __)',
          title: 'Absolute value'
        }
      ]
    }, {
      name: 'Functions',
      color: 'violet',
      blocks: [
        {
          block: 'exports.myFunction = myFunction;',
          title: 'exports a function'
        }, {
          block: 'function myFunction() {\n  __;\n}',
          title: 'Create a function without an argument'
        }, {
          block: 'function myFunction(n) {\n  __;\n}',
          title: 'Create a function with an argument'
        }, {
          block: 'myFunction()',
          title: 'Use a function without an argument'
        }, {
          block: 'myFunction(n)',
          title: 'Use a function with argument'
        }
      ]
    }, {
      name: 'Events',
      color: 'brown',
      blocks: [
        {
          block: 'events.playerMove(function(event) {\n\t\tvar location = event.to.clone(); \n\t\tvar player = event.player; \n __ \n})',
          title: 'Create a function without an argument'
        }
      ]
    }
  ]
}


