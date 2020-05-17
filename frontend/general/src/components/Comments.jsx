import React, { useState, useEffect } from 'react';
import CommentBox from './CommentBox';
import CommentFormContainer from './CommentFormContainer';

function Comments(props) {
  const [comments, setComments] = useState([]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(`/comments/${props.id}`, { signal: abortController.signal })
    .then(result => result.json())
    .then(data => setComments(data.data))
    .then(() => {
      console.log('comments loaded');
      setCommentsLoaded(true);
    })
    .catch(err => console.error('Request failed', err));

    return() => abortController.abort();
  }, [commentsLoaded]);

  return (
    <>
      <CommentFormContainer
        recipe={props.recipe}
        setCommentsLoaded={setCommentsLoaded}
      />
      <CommentBox
        comments={comments}
      />
    </>
  )
}

export default Comments;