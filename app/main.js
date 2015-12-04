import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/game';

const mountNode = document.getElementById('root');

var index = 0;
ReactDOM.render( 
  <div>
    <Game beastName='ape' />
  </div>,
  mountNode
);