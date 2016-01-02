import React from 'react';
import {Shape, Path, Pattern} from 'react-art';
import {clickBeast} from './../actions/gameActions';
import GameStore from './../stores/gameStore';
export default class Beast extends React.Component {
  _onClick() {
    clickBeast(GameStore.getSelectedPlayer());
    console.log('click beast');
  }

  render() {
    var rectanglePath = new Path();
    rectanglePath.moveTo(0, 0);
    rectanglePath.lineTo(200, 0);
    rectanglePath.lineTo(200, 132);
    rectanglePath.lineTo(0, 132);
    rectanglePath.lineTo(0, 0);
    var beastImg = require('./../../backend/beasts/ape/ape.png');

    return <Shape 
            onClick={this._onClick}
            d={rectanglePath} 
            x={225} 
            y={220} 
            fill={new Pattern(beastImg, 200, 132, 0, 0)} />
  }
}