import Dispatcher from '../dispatcher/dispatcher';
import GameConstants from '../constants/gameConstants';
import Api from '../api/api';

var GameActions = {
  clickPlayer(player) {
    Dispatcher.dispatch({
      actionType: GameConstants.CLICK_PLAYER,
      player: player
    });
  },

  clickCell(cubeCoords) {
    Dispatcher.dispatch({
      actionType: GameConstants.CLICK_CELL,
      cubeCoords: cubeCoords
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