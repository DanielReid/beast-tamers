import React from 'react';
import Player from './player';
import _ from 'lodash';

export default class extends React.Component {
  render() {
    var players = this.props.players 
      ? _.map(this.props.players, (player, index) => {
          return <Player key={index} player={player} />
        })
      : undefined;
    return (
      <div style={{float: 'right'}} >
        {players}
      </div>
    )
  }
}