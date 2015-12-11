import React from 'react';
import Player from './player';

export default class extends React.Component {
  render() {
    var players = this.props.players 
      ? this.props.players.map((player, index) => {
          return <Player key={index} player={player} />
        })
      : undefined;
    return (
      <div>
        {players}
      </div>
    )
  }
}