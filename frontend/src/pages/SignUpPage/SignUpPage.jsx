import { SignUpForm } from '../../components/SignUp/SignUp';

import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/User/operations.js';
import { useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';

export const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRegister = async body => {
    try {
      const resultAction = await dispatch(registerUser(body));
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
      <SignUpForm signUp={handleRegister} />
    </>
  );
};
