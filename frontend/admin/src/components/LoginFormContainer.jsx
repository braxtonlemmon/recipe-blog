import React, { useState } from 'react';
import LoginFormComponent from './LoginFormComponent';
import { useHistory } from 'react-router-dom';

function LoginFormContainer(props) {
  const history = useHistory();
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
      if (response.ok && response.status === 200) {
        return response.json();
      }
      setLoginData({ username: '', password: ''})
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      props.handleLogin(data.name);
      history.push('/');
      return;
    })
    .catch(err => console.log(err.message));
  }
  
  return (
    <>
      {
        props.isLoggedIn ?
        <p>Welcome Back</p>
        :
        <LoginFormComponent 
          loginData={loginData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      }
    </>
  )
}

export default LoginFormContainer;

