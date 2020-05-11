import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  h2 {
    margin: 10px 0 15px 0;
  }
  border-top: 5px solid black;
  align-items: center;
`;

const CommentRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px 0;
  border-bottom: 2px dashed black;
  .comment-info {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 10px;
  }
  .comment-name {
    text-decoration: underline;
  }
  .comment-date {
    font-size: 0.8em;
    font-style: italic;
  }
`;

function CommentBox(props) {
  const generateComments = () => {
    let allComments = [];
    props.comments.map((comment, i) => {
      return allComments.push(
        <CommentRow key={i}>
          <div className="comment-info">
            <span className="comment-name">{comment.name.toUpperCase()}</span>
            <span className="comment-date">{comment.dateFormatted}</span>
          </div>

          <p>{comment.content}</p>
        </CommentRow>
      )
    })
    return allComments;
  }
  
  return(
    <Wrapper>
      <h2>COMMENTS</h2>
      <div>{
        props.comments.length === 0 ?
        '- No comments yet -' :
        generateComments()}
      </div>
    </Wrapper>
  )
}

export default CommentBox;