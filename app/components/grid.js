import React from 'react';
import {Group} from 'react-art';
import Cell from './cell';

export default class extends React.Component {
  render() {
    var hexSize = 40;
    if(this.props.data) {
      var centre = this.props.centre;
      var cells = this.props.data.map(function(cell, index) {
        return <Cell key={index} cellState={cell} worldCentre={centre} size={hexSize}/>
      });
    }
    return (
      <Group>
        {cells}
      </Group>
    )
  }
}