import React from 'react';
import styled from 'styled-components';


const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  input {
    padding: 6px;
    line-height: 1.4em;
    font-size: 1.1em;
    text-align: center;
    outline: none;
  }

  textarea {
    resize: none;
    outline: none;
    padding: 8px;
    font-size: 1.1em;
  }
`;

function CommentFormComponent(props) {
  return (
    <FormWrapper name="commentForm">

        <h2>Add Comment</h2>
        <label htmlFor="name">Name</label>
        <input 
          type="text"
          placeholder="Your name (optional)"
          name="name"
          id="name"
          value={props.data.name}
          onChange={props.handleChange}
        />

        <label htmlFor="content">Comment</label>
        <textarea 
          name="content" 
          id="content" 
          cols="30" 
          rows="10"
          required
          value={props.data.content}
          onChange={props.handleChange}
        >
          Add your comment here.
        </textarea>

        <button
          onClick={props.handleSubmit}
        >
          Submit
        </button>

    </FormWrapper>

  )
}

export default CommentFormComponent;