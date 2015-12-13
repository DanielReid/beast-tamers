import {EventEmitter} from 'events';
import Dispatcher from './../dispatcher/dispatcher';
import GameConstants from './../constants/gameConstants';
import assign from 'object-assign';
import _ from 'lodash';
import {hexDist} from './../hexUtil';

var _players = {};
var _selectedPlayer = undefined;
const CHANGE_EVENT = 'change';

function loadPlayers(players) {
  _players = players;
}

function clickPlayer(clickedPlayer) {
  _players = _.reduce(_players, (accum, player) => {
    player.isSelected = (player.id === clickedPlayer.id) ? !player.isSelected : false;
    accum[player.id] = player;
    return accum;
  }, {});
  _selectedPlayer = clickedPlayer.isSelected ? clickedPlayer : undefined;
}

function clickCell(cubeCoords) {
  if(_selectedPlayer &&
     hexDist(cubeCoords, _selectedPlayer.position) <= _selectedPlayer.playerClass.move) {
    _selectedPlayer.position = cubeCoords;
  }
}

var PlayerStore = assign({}, EventEmitter.prototype, {
  getPlayers() {
    return _players;
  },

  getSelectedPlayer() {
    return _selectedPlayer;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

PlayerStore.dispatch = Dispatcher.register((action) => {
  switch(action.actionType) {
    case GameConstants.CLICK_CELL:
      clickCell(action.cubeCoords);
      break;
    case GameConstants.CLICK_PLAYER: 
      clickPlayer(action.player);
      break;
    case GameConstants.LOAD_PLAYERS:
      loadPlayers(action.response);
      break;
    default: return true;
  }
  PlayerStore.emitChange();
  return true;
});

module.exports = PlayerStore;