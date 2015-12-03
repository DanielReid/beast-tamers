import React from 'react';
import {Group} from 'react-art';
import Cell from './cell';

export default class extends React.Component {
  render() {
    var centre = {
      x: this.props.width / 2,
      y : this.props.height / 2
    };
    var size = 40;
    var cells = this.props.data.map(function(cell, index) {
      return <Cell key={index} cellState={cell} worldCentre={centre} size={size}/>
    });
    return (
      <Group>
        {cells}
      </Group>
    )
  }
}