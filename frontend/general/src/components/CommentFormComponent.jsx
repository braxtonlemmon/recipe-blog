import React from 'react';
import styled from 'styled-components';
import { H2 } from './Shared';

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-top: 5px solid black;
  padding: 15px;
  label {
    padding: 8px;
  }
  input {
    padding: 6px;
    line-height: 1.4em;
    font-size: 1.1em;
    text-align: center;
    outline: none;
    background: #fbfaff;
    border: 1px solid lightgray;
  }

  textarea {
    resize: none;
    outline: none;
    padding: 8px;
    font-size: 1.1em;
    text-align: center;
    margin-bottom: 10px;
    background: #fbfaff;
    border: 1px solid lightgray;
  }
  grid-area: commentForm;
  margin: 15px 0;
`;

function CommentFormComponent(props) {
  return (
    <FormWrapper name="commentForm">

        <H2>Add Comment</H2>
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
          min="2"
          placeholder="Your comment here..."
          value={props.data.content}
          onChange={props.handleChange}
        >
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