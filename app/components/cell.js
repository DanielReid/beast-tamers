import React from 'react';
import {Group, Text} from 'react-art';
import {cubeToPixel} from './../hexUtil';
import Hex from './hex';
import GameConstants from './../constants/gameConstants';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cubeCoords: props.cellState.cubeCoords,
      coords: cubeToPixel(props.size, props.cellState.cubeCoords, props.worldCentre),
      label: props.cellState.label
    };
  }

  _onClick() {
    console.log('cell clicked');
    clickCell(this.state.cubeCoords);
  }

  render() {
    var coords = this.state.coords;
    var size = GameConstants.HEX_SIZE;
    return (
      <Group onClick={this._onClick.bind(this)}>
        <Hex size={size} pixelCoords={coords} colour='white'/>
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