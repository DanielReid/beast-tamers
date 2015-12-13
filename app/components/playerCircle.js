import React from 'react';
import {clickPlayer} from '../actions/gameActions';
import {cubeToPixel} from './../hexUtil';
import Circle from 'react-art/shapes/circle';

export default class PlayerCircle extends React.Component{
  _onClick() {
    clickPlayer(this.props.player);
  }

  render() {
    var size = 40;
    var coords = cubeToPixel(size, this.props.player.position, this.props.centre);
    return (
      <Circle 
        onClick={this._onClick.bind(this)}
        radius={size / 2} 
        fill={this.props.player.colour} 
        stroke="black" 
        x={coords.x} 
        y = {coords.y} 
        />
      )

  }
}