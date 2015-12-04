'use strict';
var Router = require('falcor-router');
var apeMap = require('./beasts/ape/map.json');
var falcor = require('falcor');
var _ = require('lodash');

var $atom = falcor.Model.atom;
var $ref = falcor.Model.ref;

var data = {
  classes: [{
    name: 'Shieldbot',
    maxHealth: 2,
    move: 3,
    range: 2,
    tranq: 1
  }, {
    name: 'Sniper',
    maxHealth: 2,
    move: 2,
    range: 3,
    tranq: 3
  }],
  players: [{
    name: 'Player 1',
    class: $ref('classes[0]'),
    position: $atom({
      x: 2,
      y: 0,
      z: -2
    })
  }, {
    name: 'Player 2',
    class: $ref('classes[1]'),
    position: $atom({
      x: -2,
      y: 0,
      z: 2
    })
  }],
  beasts: [{
    name: 'ape',
    map: $atom(apeMap)
  }]
};

function extractProperties(pathSet, root, data) {
  var results = [];
  pathSet.indices.forEach((index) => {
    pathSet[2].map((fieldName) => { // pathSet[2] holds which fieldNames asked
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
  route: 'beasts[{integers:indices}]["name", "map"]',
  get: function(pathSet) {
    console.log('@@@ getting beasts')
    return extractProperties(pathSet, 'beasts', data.beasts);
  }
}, {
  route: 'players[{integers:indices}]["name", "class", "position"]',
  get: function(pathSet) {
    console.log('@@@ getting players')
    return extractProperties(pathSet, 'players', data.players);
  }
}]) {
  constructor() {
    super();
  }
}

module.exports = GameRouter;