import {EventEmitter} from 'events';
import Dispatcher from './../dispatcher/dispatcher';
import GameConstants from './../constants/gameConstants';
import assign from 'object-assign';
import {hexDist} from './../hexUtil';

var _turn = 1,
  _players = {},
  _monster = {},
  _selectedPlayer = undefined;

const CHANGE_EVENT = 'change-game';

function loadPlayers(players) {
  _players = players;
  resetPlayerActions();
}

function loadMonster(monster) {
  _monster = monster;
  _monster.remainingHp = _monster.dmgRequired;
}

function hitMonster(amount) {
  _monster.remainingHp -= amount;
  if(_monster.remainingHp <= 0) {
    // end game 
  }
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
  return _.min(_monster.bodyCells.map((cell) => {
    return hexDist(cell.cubeCoords, _selectedPlayer.position)
  }))
}
function attackIfPossible() {
  if(_selectedPlayer && rangeToMonster() < _selectedPlayer.playerClass.range) {
    hitMonster(_selectedPlayer.playerClass.tranq);
    useActionPoint();
  }
}

var GameStore = assign({}, EventEmitter.prototype, {
  getTurn() {
    return _turn;
  },
  nextTurn() {
    ++_turn;
  },
  getPlayers() {
    return _players;
  },
  getSelectedPlayer() {
    return _selectedPlayer;
  },
  getMonster() {
    return _monster;
  },
  hitMonster(amount) {
    _monster.remainingHp -= amount;
  },
  resolveMonsterActions() {

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

GameStore.dispatch = Dispatcher.register((action) => {
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
    case GameConstants.LOAD_MONSTER:
      loadMonster(action.response);
      break;
    default: return true;
  }
  GameStore.emitChange();
  return true;
});

module.exports = GameStore;