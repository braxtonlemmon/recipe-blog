import React, { useState, useEffect } from 'react';
import CommentBox from './CommentBox';
import CommentFormContainer from './CommentFormContainer';

function Comments({ mongodb_id }) {
  const [comments, setComments] = useState([]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    
    fetch(`/api/comments/${mongodb_id}`, { signal: abortController.signal })
      .then(result => result.json())
      .then(data => setComments(data.data))
      .then(() => setCommentsLoaded(true))
      .catch(err => console.error('Request failed', err));
      return () => abortController.abort();
  }, [commentsLoaded])

  return (
    <>
      <CommentFormContainer
        mongodb_id={mongodb_id}
        setCommentsLoaded={setCommentsLoaded}
      />
      <CommentBox
        comments={comments}
      />
    </>
  )
}

export default Comments;