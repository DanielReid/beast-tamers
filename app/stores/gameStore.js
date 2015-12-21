import {EventEmitter} from 'events';
import Dispatcher from './../dispatcher/dispatcher';
import GameConstants from './../constants/gameConstants';
import assign from 'object-assign';
import MonsterStore from './monsterStore';

var turn = 0;

const CHANGE_EVENT = 'change-game';

var GameStore = assign({}, EventEmitter.prototype, {
  getTurn:function() {
    return turn;
  },
  nextTurn: function() {
    ++turn;
    MonsterStore.resolveMonsterActions();
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
    case GameConstants.NEXT_TURN:
      nextTurn();
      break; 
    default: return true;
  }
  GameStore.emitChange();
  return true;
});

module.exports = GameStore;