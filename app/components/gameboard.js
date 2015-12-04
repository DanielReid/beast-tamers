import React from 'react';
import {Surface, Pattern, Path, Shape} from 'react-art';
import Circle from 'react-art/shapes/circle';
import Grid from './grid';
import _ from 'lodash';
import {cubeToPixel} from './../hexUtil';

function createPlayerCircle(centre, player) {
  var size = 40;
  var coords = cubeToPixel(size, player.position, centre);
  return <Circle key={player.name} radius={size / 2} fill="yellow" stroke="black" x={coords.x} y = {coords.y}> </Circle> 
}

export default class extends React.Component {
  render() {
    var width = 500;
    var height=350;
    var centre = {
      x: width / 2,
      y: height / 2
    };
    var rectanglePath = new Path();
    rectanglePath.moveTo(0, 0);
    rectanglePath.lineTo(300, 0);
    rectanglePath.lineTo(300, 132);
    rectanglePath.lineTo(0, 132);
    rectanglePath.lineTo(0, 0);
    var beastImg = require('./../../backend/beasts/ape/ape.png');
    var grid = this.props.beast 
      ? <Grid data={this.props.beast.map} centre={centre} /> 
      : undefined;
    var players = this.props.players
      ? _.map(this.props.players, _.partial(createPlayerCircle, centre))
      : undefined;

    return (
      <div className="gameBoard">
        <h1>Game Board</h1>
        <Surface width={width} height={height}>
          {grid}
          <Shape 
            d={rectanglePath} 
            x={140} 
            y={220} 
            fill={new Pattern(beastImg, 300, 132, 0, 0)} />
          {players}
        </Surface>
      </div>
    )
  }
}