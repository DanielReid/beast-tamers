import React from 'react';
import Gameboard from './gameboard';
import PlayerStore from './../stores/playerStore';
import MonsterStore from './../stores/monsterStore';
import GameStore from './../stores/gameStore';
import GameActions from './../actions/gameActions';

export default class extends React.Component {
  componentWillMount() {
    var onChange = this._onChange.bind(this);
    PlayerStore.addChangeListener(onChange);
    MonsterStore.addChangeListener(onChange);
    GameStore.addChangeListener(onChange);

    GameActions.loadPlayers();
    GameActions.loadMonster();
    GameActions.initGameState();
  }

  componentWillUnmount() {
    var onChange = this._onChange.bind(this);
    PlayerStore.removeChangeListener(onChange);
    MonsterStore.removeChangeListener(onChange);
    GameStore.removeChangeListener(onChange);
  }

  _onChange() {
    this.setState({
      players: PlayerStore.getPlayers(),
      selectedPlayer: PlayerStore.getSelectedPlayer(),
      beast: MonsterStore.getMonster(),
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