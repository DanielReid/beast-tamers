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

  clickBeast(clickingPlayer) {
    Dispatcher.dispatch({
      actionType: GameConstants.CLICK_BEAST,
      clickingPlayer: clickingPlayer
    });
  },

  loadPlayers() {
    Api.loadPlayers();
  },
  
  loadMonster() {
    Api.loadMonster();
  },

  initGameState() {
    Dispatcher.dispatch({
      actionType: GameConstants.RESET_PLAYER_ACTIONS
    });
  }
};

module.exports = GameActions;