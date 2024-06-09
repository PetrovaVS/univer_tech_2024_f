import React from 'react';

const CommentList = ({ comments }) => {
  return (
    <div className="comment-list">
      <h3>Comments:</h3>
      {comments.map((comment) => (
        <div key={comment.id} className="comment-card">
          <strong>{comment.name}</strong>
          <p>{comment.body}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
