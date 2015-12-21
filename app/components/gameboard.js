import React from 'react';
import {Surface, Pattern, Path, Shape} from 'react-art';
import Grid from './grid';
import PlayerList from './playerList';
import PlayerCircle from './playerCircle';
import Beast from './beast';
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

    var grid = this.props.beast 
      ? <Grid data={this.props.beast.map ? this.props.beast.map.concat(this.props.beast.bodyCells) : undefined} centre={centre} /> 
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
          <Beast />
          {moveHighlights}
          {playerCircles}
        </Surface>
        <PlayerList players={this.props.players}/>
        <p>Turn {this.props.turnNumber}</p>
        <p>Beast HP {this.props.beast.remainingHp}</p>
      </div>
    )
  }
}