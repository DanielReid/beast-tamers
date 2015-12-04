import React from 'react';
import Comment from './comment'

export default class extends React.Component {
  render() {
    return (
      <div className="commentList">
        <Comment author="me">This is a comment</Comment>
        <Comment author="you">This is another comment</Comment>
      </div>
    );
  }
};