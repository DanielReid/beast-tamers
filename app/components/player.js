import React from 'react';
import {clickPlayer} from '../actions/gameActions';

export default class extends React.Component {
  _onClick() {
    clickPlayer(this.props.player);
  }

  render() {
    var selectedStyle = this.props.player.isSelected
      ? {border: '1px solid ' + this.props.player.colour}
      : {};
    return (
      <div style={selectedStyle} onClick={this._onClick.bind(this)}>
        <h1 style={{color: this.props.player.colour}}>{this.props.player.name}</h1>
        <p>class: {this.props.player.playerClass.name}</p>
        <p>range: {this.props.player.playerClass.range}</p>
        <p>actions per turn: {this.props.player.playerClass.actionsPerTurn}</p>
        <p>remaining actions: {this.props.player.remainingActions}</p>
      </div>
    );
  }

}