import React from 'react';
import styled from 'styled-components';
import { H1 } from './Shared';
import Button from './shared/Button';

const FormWrapper = styled.form`
  display: grid;
  grid-auto-flow: row;
  gap: 10px;
  justify-items: center;
  input {
    padding: 6px;
    line-height: 1.4em;
    font-size: 1.1em;
    text-align: center;
    outline: none;
  }
`;

const MyH1 = styled(H1)`
  margin-bottom: 2em;
`

function LoginFormComponent(props) {
  return (
    <FormWrapper name="loginForm">
      <MyH1>Login</MyH1>
      <label htmlFor="username">username</label>
      <input 
        type="text"
        placeholder="username"
        name="username"
        id="username"
        value={props.loginData.username}
        onChange={props.handleChange}
      />

      <label htmlFor="password">password</label>
      <input 
        type="password"
        placeholder="Password"
        name="password"
        id="password"
        value={props.loginData.password}
        onChange={props.handleChange}
        required
      />

      <Button
        onClick={(e) => props.handleSubmit(e)}
      >
        Login
      </Button>
    </FormWrapper>
  )
}

export default LoginFormComponent;