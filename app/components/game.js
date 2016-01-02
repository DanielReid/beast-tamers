import React from 'react';
import Gameboard from './gameboard';
import GameStore from './../stores/gameStore';
import GameActions from './../actions/gameActions';

export default class extends React.Component {
  componentWillMount() {
    var onChange = this._onChange.bind(this);
    GameStore.addChangeListener(onChange);
    GameStore.addChangeListener(onChange);

    GameActions.loadPlayers();
    GameActions.loadMonster();
    GameActions.initGameState();
  }

  componentWillUnmount() {
    var onChange = this._onChange.bind(this);
    GameStore.removeChangeListener(onChange);
    GameStore.removeChangeListener(onChange);
  }

  _onChange() {
    this.setState({
      players: GameStore.getPlayers(),
      selectedPlayer: GameStore.getSelectedPlayer(),
      beast: GameStore.getMonster(),
      turnNumber: GameStore.getTurn()
    });
  }


  render() {
    return (
      <div>
        <Gameboard 
          beast={this.state.beast} 
          players={this.state.players}
          selectedPlayer={this.state.selectedPlayer}
          turnNumber={this.state.turnNumber}
          />
      </div>
    )
  }
}