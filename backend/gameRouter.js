'use strict';
var Router = require('falcor-router');
var apeMap = require('./beasts/ape/map.json');
var falcor = require('falcor');
var _ = require('lodash');

var $atom = falcor.Model.atom;
var $ref = falcor.Model.ref;

var apeCells = [{
  cubeCoords: {
    x:  0,
    y: -1,
    z:  1,
  },
  label: 'ape1'
},{
  cubeCoords: {
    x: -1,
    y: -1,
    z:  2,
  },
  label: 'ape2'
}, {
  cubeCoords: {
    x:  1,
    y: -2,
    z:  1,
  },
  label: 'ape1'
}
]

var data = {
  playerClasses: [{
    id: 0,
    name: 'Shieldbot',
    maxHealth: 2,
    move: 3,
    range: 2,
    tranq: 1,
    actionsPerTurn: 2
  }, {
    id: 1,
    name: 'Sniper',
    maxHealth: 2,
    move: 3,
    range: 3,
    tranq: 3,
    actionsPerTurn: 1
  }, {
    id: 1,
    name: 'Enchancer',
    maxHealth: 2,
    move: 2,
    range: 2,
    tranq: 1,
    actionsPerTurn: 2
  }],
  players: [{
    id: 0,
    name: 'Player 1',
    playerClass: $ref('playerClasses[0]'),
    colour: 'red',
    position: $atom({
      x: 2,
      y: 0,
      z: -2
    })
  }, {
    id: 1,
    name: 'Player 2',
    playerClass: $ref('playerClasses[1]'),
    colour: 'yellow',
    position: $atom({
      x: -2,
      y: 0,
      z: 2
    })
  }, {
    id: 2,
    name: 'Player 3',
    playerClass: $ref('playerClasses[2]'),
    colour: 'blue',
    position: $atom({
      x: 3,
      y: -3,
      z: 0
    })
  }],
  beasts: [{
    id: 0,
    name: 'ape',
    dmgRequired: 20,
    map: $atom(apeMap),
    bodyCells: $atom(apeCells)
  }]
};

function extractProperties(pathSet, root, data) {
  var results = [];
  pathSet.indices.forEach((index) => {
    pathSet[2].map((fieldName) => { // pathSet[2] holds which fieldNames asked
      console.log('   ~~~ retrieving ' + fieldName);
      if (data.length > index) {
        results.push({
          path: [root, index, fieldName],
          value: data[index][fieldName]
        });
      }
    });
  });
  return results;
}

class GameRouter extends
Router.createClass([{
  route: 'beasts.length',
  get: function() {
    console.log('getting length');
    return {
      path: ['beasts', 'length'],
      value: data.beasts.length
    };
  }
}, {
  route: 'beasts[{integers:indices}]["name", "dmgRequired", "map", "bodyCells"]',
  get: function(pathSet) {
    console.log('@@@ getting beasts')
    return extractProperties(pathSet, 'beasts', data.beasts);
  }
}, {
  route: 'players[{integers:indices}]["id", "colour", "name", "position", "playerClass"]',
  get: function(pathSet) {
    console.log('@@@ getting players;pathSet ' + JSON.stringify(pathSet) )
    return extractProperties(pathSet, 'players', data.players);
  }
}, {
  route: 'playerClasses[{integers:indices}]["id", "name", "maxHealth", "move", "range", "tranq", "actionsPerTurn"]',
  get: function(pathSet) {
    console.log('@@@ getting players;pathSet ' + JSON.stringify(pathSet) )
    return extractProperties(pathSet, 'playerClasses', data.playerClasses);
  }
}]) {
  constructor() {
    super();
  }
}

module.exports = GameRouter;