import React from 'react';
import {Surface, Pattern, Path, Shape} from 'react-art';
import Grid from './grid';

export default class extends React.Component {

  render() {
    var width = 500;
    var height=350;
    var rectanglePath = new Path();
    rectanglePath.moveTo(0, 0);
    rectanglePath.lineTo(300, 0);
    rectanglePath.lineTo(300, 132);
    rectanglePath.lineTo(0, 132);
    rectanglePath.lineTo(0, 0);
    var beastImg = require('../../beasts/ape/ape.png');

    return (
      <div className="gameBoard">
        <h1>Game Board</h1>
        <Surface width={width} height={height}>
          <Grid data={this.props.data} width={width} height={height}/>
          <Shape 
            d={rectanglePath} 
            x={140} 
            y={220} 
            fill={new Pattern(beastImg, 300, 132, 0, 0)} />
        </Surface>
      </div>
    )
  }
}