import React from 'react';
import falcor from 'falcor';
import FalcorHttpDataSource from 'falcor-http-datasource';
import Gameboard from './gameboard';
import PlayerStore from './../stores/playerStore';
import MonsterStore from './../stores/monsterStore';
import GameActions from './../actions/gameActions';
import _ from 'lodash';

export default class extends React.Component {
  componentWillMount() {
    PlayerStore.addChangeListener(this._onChange.bind(this));
    MonsterStore.addChangeListener(this._onChange.bind(this));
    GameActions.loadPlayers();
    GameActions.loadMonster();
  }

  _onChange() {
    this.setState({
      players: PlayerStore.getPlayers(),
      selectedPlayer: PlayerStore.getSelectedPlayer(),
      beast: MonsterStore.getMonster()
    });
  }


  render() {
    return (
      <div>
        <Gameboard 
          beast={this.state.beast} 
          players={this.state.players}
          selectedPlayer={this.state.selectedPlayer}/>
      </div>
    )
  }
}