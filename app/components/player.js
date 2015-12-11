import React from 'react';
import {selectPlayer} from '../actions/gameActions';

export default class extends React.Component {
  _onClick() {
    selectPlayer(this.props.player);
  }

  render() {
    var selectedStyle = this.props.player.isSelected
      ? {border: '1px solid ' + this.props.player.colour}
      : {};
    return (
      <div style={selectedStyle} onClick={this._onClick.bind(this)}>
        <h1>{this.props.player.name}</h1>
        <p>class: {this.props.player.playerClass.name}</p>
      </div>
    );
  }

}