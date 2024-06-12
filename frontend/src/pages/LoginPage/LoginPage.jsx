import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/User/operations';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { unwrapResult } from '@reduxjs/toolkit';

// import { LogInThunk } from 'store/thunk/thunk';

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async body => {
    try {
      const resultAction = await dispatch(loginUser(body));
      unwrapResult(resultAction);
      alert('Welcome');
      navigate('/diploma_front/');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Неправильні данні');
    }
  };

  return (
    <>
      <LoginForm login={handleLogin} />
    </>
  );
};
