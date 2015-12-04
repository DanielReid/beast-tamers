import React from 'react';
import CommentList from './CommentList';

export default class extends React.Component {
  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList />
      </div>
    );
  }
};