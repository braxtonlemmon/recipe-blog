import styled from 'styled-components';
import button from './shared/Button';

export const ImageInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15px;
  background: lightgrey;
  padding: 8px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
  input {
    font-size: 1.1em;
    padding: 4px;
    text-align: center;
    height: 2.5em;
    line-height: 2.5em;
    outline: none;
  }
  textarea {
    resize: none;
    padding: 5px;
    text-align: center;
    outline: none;
    font-size: 1.1em;
  }
  h2 {
    font-size: 1.3em;
  }
  .ingredients-box, .steps-box {
    background: none;
  }
  .publish-box {
    background: none;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
  background: lightgray;
  padding: 8px;
  padding-bottom: 10px;
`;

export const RowTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 1em;
  line-height: 1.1em;
  margin-bottom: 10px;

`;

export const Button = styled(button)`
  padding: 5px 15px;
  font-size: 1em;
`;

export const MoveButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 8px;
  .publish-row {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .publish-row >* {
    margin: 0 10px;
    cursor: pointer;
  }
  background: lightgrey;
  padding: 8px;
`;

