import React from 'react';
import ReactDOM from 'react-dom';
import Gameboard from './components/gameboard';

const mountNode = document.getElementById('root');


var index = 0;
var gridCells = require('../beasts/ape/map.json');
ReactDOM.render( 
  <div>
    <Gameboard data = {gridCells} />
  </div>,
  mountNode
);