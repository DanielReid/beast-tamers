import React from 'react';
import {Group} from 'react-art';
import GameConstants from './../constants/gameConstants';
import {radius, cubeToPixel} from './../hexUtil';
import Hex from './hex';
import {clickCell} from './../actions/gameActions'

export default class MoveHiglights extends React.Component {
  render() {
      var centre = this.props.centre;
      var rangecoords = radius(this.props.player.position, this.props.player.playerClass.move);
      var cells = rangecoords
        .filter((cubeCoord) => {
          return this.props.map.some((cell) => {
            return cell.cubeCoords.x === cubeCoord.x &&
              cell.cubeCoords.y === cubeCoord.y &&
              cell.cubeCoords.z === cubeCoord.z;
          });
        })
        .map(function(coords, index) {
          var pixelCoords = cubeToPixel(GameConstants.HEX_SIZE, coords, centre);
          return (
            <Hex 
              key={index} 
              size={GameConstants.HEX_SIZE}
              cubeCoords={coords}
              pixelCoords={pixelCoords} 
              colour={this.props.player.colour} 
              opacity={0.3} 
            />)
        });
      return (
        <Group>
          {cells}
        </Group>
      )
  }

}