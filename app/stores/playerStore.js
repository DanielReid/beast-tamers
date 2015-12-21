import {EventEmitter} from 'events';
import Dispatcher from './../dispatcher/dispatcher';
import GameConstants from './../constants/gameConstants';
import assign from 'object-assign';
import _ from 'lodash';
import {hexDist} from './../hexUtil';
import GameStore from './gameStore';
import MonsterStore from './MonsterStore';

var _players = {};
var _selectedPlayer = undefined;
const CHANGE_EVENT = 'change-player';

function loadPlayers(players) {
  _players = players;
  resetPlayerActions();
}

function clickPlayer(clickedPlayer) {
  _players = _.reduce(_players, (accum, player) => {
    player.isSelected = (player.id === clickedPlayer.id) ? !player.isSelected : false;
    accum[player.id] = player;
    return accum;
  }, {});
  _selectedPlayer = clickedPlayer.isSelected && clickedPlayer.remainingActions > 0 
    ? clickedPlayer 
    : undefined;
}

function deselectPlayer() {
  if(_selectedPlayer) {
    _selectedPlayer.isSelected = false;
    _selectedPlayer = undefined;
  }
}

function useActionPoint() {
  --_selectedPlayer.remainingActions;
  if(_selectedPlayer.remainingActions === 0) {
    deselectPlayer();
  }
  if(getRemainingActions() === 0) {
    resetPlayerActions();
    GameStore.nextTurn();
  }
}

function clickCell(cubeCoords) {
  if(_selectedPlayer &&
     hexDist(cubeCoords, _selectedPlayer.position) <= _selectedPlayer.playerClass.move) {
    _selectedPlayer.position = cubeCoords;
    useActionPoint();
  }
}

function getRemainingActions() {
  return _.reduce(_players, (accum, player) => {
    return accum + player.remainingActions;
  }, 0);
}

function resetPlayerActions() {
  _players = _.reduce(_players, (accum, player) => {
    player.remainingActions = player.playerClass.actionsPerTurn;
    accum[player.id] = player;
    return accum;
  }, {});
}

function rangeToMonster() {
  return _.min(MonsterStore.getBodyCells().map((cell) => {
    return hexDist(cell.cubeCoords, _selectedPlayer.position)
  }))
}
function attackIfPossible() {
  if(_selectedPlayer && rangeToMonster() <= _selectedPlayer.playerClass.range) {
    MonsterStore.hitMonster(_selectedPlayer.playerClass.tranq);
    useActionPoint();
  }
}

var PlayerStore = assign({}, EventEmitter.prototype, {
  getPlayers() {
    return _players;
  },

  getSelectedPlayer() {
    return _selectedPlayer;
  },

  resetPlayerActions() {
    resetPlayerActions();
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

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
    case GameConstants.RESET_PLAYER_ACTIONS: 
      resetPlayerActions();
      break;
    case GameConstants.CLICK_BEAST:
      attackIfPossible();
      break;
    default: return true;
  }
  PlayerStore.emitChange();
  return true;
});

module.exports = PlayerStore;