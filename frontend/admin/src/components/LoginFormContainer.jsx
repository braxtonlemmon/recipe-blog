import React, { useState } from 'react';
import LoginFormComponent from './LoginFormComponent';

function LoginFormContainer(props) {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: loginData.username,
        password: loginData.password
      })
    })
    .then(response => {
      setLoginData({ username: '', password: ''})
      if (response.ok && response.status === 200) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      console.log('yay');
      props.handleLogin(data.name);
      return;
    })
    .catch(err => console.log(err.message));
  }
  
  return (
    <LoginFormComponent 
      loginData={loginData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}

export default LoginFormContainer;