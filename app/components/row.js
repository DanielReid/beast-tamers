import React from 'react';
import _ from 'lodash';
import Cell from './cell.js';

export default class extends React.Component {
  render() {
    return (
      <div>
        {this.props.cells.map(_.partial(this.renderCell, this.props.y))}
      </div>
    )
  }

  renderCell(y, item, index) {
    return <Cell key={index} coords={ {x: index * 40, y: y * 40} } />
  }
}