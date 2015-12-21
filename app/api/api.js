import Dispatcher from '../dispatcher/dispatcher';
import GameConstants from '../constants/gameConstants';
import falcor from 'falcor';
import FalcorHttpDataSource from 'falcor-http-datasource';

var _model = new falcor.Model({
  source: new FalcorHttpDataSource('/model.json')
});

function dispatch(key, response, params) {
  var payload = {
    actionType: key,
    response: response
  };
  if (params) {
    payload.queryParams = params;
  }
  Dispatcher.dispatch(payload);
}

function loadPlayers() {
  var CLASS_PROPS = ['id', 'name', 'maxHealth', 'range', 'tranq', 'move', 'actionsPerTurn'];
  var PLAYER_PROPS = ['id', 'name', 'position', 'colour'];

  dispatch(GameConstants.LOAD_PLAYERS);
  _model.get(['players', {
    from: 0,
    to: 2
  }, PLAYER_PROPS], ['players', {
    from: 0,
    to: 2
  }, 'playerClass', CLASS_PROPS]).then((result) => {
    dispatch(GameConstants.LOAD_PLAYERS, result.json.players)
  });
}

function loadMonster() {
  _model.get('beasts[0]["name", "map","dmgRequired","bodyCells"]').then((result) => {
    dispatch(GameConstants.LOAD_MONSTER, result.json.beasts[0]);
  });
}

module.exports = {
  loadPlayers: loadPlayers,
  loadMonster: loadMonster
}