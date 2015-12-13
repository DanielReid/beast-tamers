import React from 'react';
import {Shape, Path} from 'react-art';
import {clickCell} from './../actions/gameActions';

function makeHexPath(size, coords) {
  var path = new Path();
  var point = 0;
  var angle = null;
  var x = null;
  var y = null;

  while (point < 7) {
    angle = 2 * Math.PI / 6 * (point);
    x = coords.x + size * Math.cos(angle);
    y = coords.y + size * Math.sin(angle);

    if (point === 0) {
      path.moveTo(x, y);
    }
    else {
      path.lineTo(x, y);
    }

    point = point + 1;
  }

  return path;
}

export default class Hex extends React.Component{
  render() {
    var path = makeHexPath(this.props.size, this.props.pixelCoords);
    return <Shape onClick={this._onClick.bind(this)} d={path} fill={this.props.colour} stroke="black" opacity={this.props.opacity}></Shape>
  }
  _onClick() {
    console.log('highlight clicked');
    clickCell(this.props.cubeCoords)
  }
}