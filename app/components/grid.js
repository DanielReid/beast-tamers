import React from 'react';
import {Group} from 'react-art';
import Cell from './cell';
import GameConstants from '../constants/gameConstants';

export default class extends React.Component {
  render() {
    if(this.props.data) {
      var centre = this.props.centre;
      var cells = this.props.data.map(function(cell, index) {
        return <Cell key={index} cellState={cell} worldCentre={centre} size={GameConstants.HEX_SIZE} />
      });
    }
    return (
      <Group>
        {cells}
      </Group>
    )
  }
}