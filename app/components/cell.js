import React from 'react';
import {Shape, Path, Group, Text} from 'react-art';
import {cubeToPixel} from './../hexUtil';

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

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cubeCoords: props.cellState.cubeCoords,
      coords: cubeToPixel(props.size, props.cellState.cubeCoords, props.worldCentre),
      label: props.cellState.label
    };
  }

  handleClick() {
    
  }

  render() {
    var size = 40;
    var coords = this.state.coords;
    var path = makeHexPath(size, coords);
    return (
      <Group onClick={this.handleClick}>
        <Shape d={path} fill="white" stroke="black"></Shape>
        <Text x={coords.x + size/2} y={coords.y - 10} fill="orange">
          {this.state.cubeCoords.x.toString()}
        </Text>
        <Text x={coords.x - size/2} y={coords.y + size/2 - 10} fill="gray">
          {this.state.cubeCoords.y.toString()}
        </Text>
        <Text x={coords.x - size/2} y={coords.y - size/2 - 10} fill="blue">
          {this.state.cubeCoords.z.toString()}
        </Text>
        <Text x={coords.x} y={coords.y - 10} fill="black">
          {this.state.label.toString()}
        </Text>
      </Group>
    )
  }
}