import React from 'react';
import falcor from 'falcor';
import FalcorHttpDataSource from 'falcor-http-datasource';
import Gameboard from './gameboard';
import PlayerStore from './../stores/playerStore';
import MonsterStore from './../stores/monsterStore';
import GameActions from './../actions/gameActions';
import _ from 'lodash';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      model: new falcor.Model({
        source: new FalcorHttpDataSource('/model.json')
      }),
      beast: {}
    };
  }

  componentDidMount() {
    PlayerStore.addChangeListener(this._onChange.bind(this));
    MonsterStore.addChangeListener(this._onChange.bind(this));
    GameActions.loadPlayers();
    GameActions.loadMonster();
  }

  _onChange() {
    this.setState({
      players: PlayerStore.getPlayers(),
      beast: MonsterStore.getMonster()
    });
  }


  render() {
    return (
      <div onClick={(e) => {
            console.log('click event client x:' + e.clientX + ', y: ' + e.clientY);
            console.log('click event page x:' + e.pageX + ', y: ' + e.pageY);
          }}
      >
        <Gameboard beast={this.state.beast} players={this.state.players}/>
      </div>
    )
  }
}