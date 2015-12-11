import {EventEmitter} from 'events';
import Dispatcher from './../dispatcher/dispatcher';
import GameConstants from './../constants/gameConstants';
import assign from 'object-assign';

var _players = [];
const CHANGE_EVENT = 'change';

function loadPlayers(players) {
  _players = players;
}

function selectPlayer(player) {
  _players[player.id].isSelected = true;
}


var PlayerStore = assign({}, EventEmitter.prototype, {
  getPlayers() {
    return _players;
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
    case GameConstants.CLICK_PLAYER: 
      selectPlayer(action.player);
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