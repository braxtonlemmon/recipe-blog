import React, { useState } from 'react';
import CommentFormComponent from './CommentFormComponent';

function CommentFormContainer({ mongodb_id, setCommentsLoaded }) {
  const [data, setData] = useState({
    name: '',
    content: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.content.length < 1 || data.content.length > 1000) {
      return alert('wrongo');
    }
    setData({ name: '', content: '' });
    fetch('/api/comments/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        content: data.content,
        recipe: mongodb_id
      })
    })
      .then(response => {
        if (response.ok && response.status === 200) {
          setCommentsLoaded(false);
          return response.json();
        }
        throw new Error('Network response was not okay');
      })
      .catch(err => console.log(err.message));
  }

  return (
    <CommentFormComponent
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      data={data}
    />
  )
}

export default CommentFormContainer;