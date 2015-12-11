import {EventEmitter} from 'events';
import Dispatcher from './../dispatcher/dispatcher';
import GameConstants from './../constants/gameConstants';
import assign from 'object-assign';

var _monster = {};
const CHANGE_EVENT = 'change';

function loadMonster(monster) {
  _monster = monster;
}

var MonsterStore = assign({}, EventEmitter.prototype, {
  getMonster() {
    return _monster;
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

MonsterStore.dispatch = Dispatcher.register((action) => {
  switch(action.actionType) {
    case GameConstants.LOAD_MONSTER:
      loadMonster(action.response);
      break;
    default: return true;
  }
  MonsterStore.emitChange();
  return true;
});

module.exports = MonsterStore;