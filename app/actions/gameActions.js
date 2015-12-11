import Dispatcher from '../dispatcher/dispatcher';
import GameConstants from '../constants/gameConstants';
import Api from '../api/api';

var GameActions = {
  selectPlayer: function(player) {
    Dispatcher.dispatch({
      actionType: GameConstants.CLICK_PLAYER,
      player: player
    });
  },
  loadPlayers() {
    Api.loadPlayers();
  },
  loadMonster() {
    Api.loadMonster();
  }
};

module.exports = GameActions;