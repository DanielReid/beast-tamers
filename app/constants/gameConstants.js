import keyMirror from 'keymirror';
import assign from 'object-assign';

module.exports = assign({HEX_SIZE: 40}, keyMirror({
  LOAD_PLAYERS: null,
  LOAD_MONSTER: null,
  CLICK_PLAYER: null,
  CLICK_CELL: null
}));