import React, { useEffect } from 'react';
import { Slide, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CustomToastContainer } from './Notification.styled';

export const NotificationMessage = ({ message }) => {
  useEffect(() => {
    if (message) {
      toast(message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Slide,
      });
    }
  }, [message]);

  return <CustomToastContainer />;
};
