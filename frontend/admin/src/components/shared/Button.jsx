import styled from 'styled-components';

const Button = styled.button`
  display: flex;
  background-color: #754c4ccf;
  color: white;
  justify-content: center;
  align-items: center;
  padding: 7px;
  font-size: 1.1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    box-shadow: -2px 2px 2px darkgrey;
    transform: scale(1.01);
  }
  outline: none;
`;

export default Button;