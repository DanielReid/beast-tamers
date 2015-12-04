import React from 'react';
import falcor from 'falcor';
import FalcorHttpDataSource from 'falcor-http-datasource';
import Gameboard from './gameboard';
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

  componentWillMount() {
    this.update();
  }

  update() {
    this.state.model.get('beasts[0]["name", "map"]').then((result) => {
      this.setState({
        beast : {
          name: result.json.beasts[0].name,
          map: result.json.beasts[0].map
        }
      });
    });
    this.state.model.get('players[0..1]["name", "position"]').then((result) => {
      this.setState({
        players: _.map(result.json.players, (player) => {
          return {
            name: player.name,
            position: player.position
          };
        })
      });
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