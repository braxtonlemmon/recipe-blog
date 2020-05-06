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
`;


function LoginFormComponent(props) {
  return (
    <FormWrapper name="loginForm">
      <h2>Login</h2>
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
      />

      <button
        onClick={props.handleSubmit}
      >
        Login
      </button>
    </FormWrapper>
  )
}

export default LoginFormComponent;