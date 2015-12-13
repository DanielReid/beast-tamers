import React from 'react';
import {Surface, Pattern, Path, Shape} from 'react-art';
import Grid from './grid';
import PlayerList from './playerList';
import PlayerCircle from './playerCircle';
import MoveHighlights from './moveHighlights';
import _ from 'lodash';

export default class extends React.Component {
  render() {
    var width = 600;
    var height=370;
    var centre = {
      x: width / 2,
      y: height / 2
    };
    var rectanglePath = new Path();
    rectanglePath.moveTo(0, 0);
    rectanglePath.lineTo(200, 0);
    rectanglePath.lineTo(200, 132);
    rectanglePath.lineTo(0, 132);
    rectanglePath.lineTo(0, 0);
    var beastImg = require('./../../backend/beasts/ape/ape.png');
    var grid = this.props.beast 
      ? <Grid data={this.props.beast.map} centre={centre} /> 
      : undefined;
    var playerCircles = this.props.players
      ? _.map(this.props.players, (player, index) => {
        return <PlayerCircle key={index} centre={centre} player={player} />
      })
      : undefined;
    var moveHighlights = this.props.selectedPlayer && this.props.beast
      ? <MoveHighlights 
          map={this.props.beast.map} 
          player={this.props.selectedPlayer} 
          centre={centre}
        />
      : undefined;
    return (
      <div className="gameBoard">
        <h1>Tame that beast</h1>
        <Surface width={width} height={height}>
          {grid}
          <Shape 
            d={rectanglePath} 
            x={225} 
            y={220} 
            fill={new Pattern(beastImg, 200, 132, 0, 0)} />
          {moveHighlights}
          {playerCircles}
        </Surface>
        <PlayerList players={this.props.players}/>
      </div>
    )
  }
}