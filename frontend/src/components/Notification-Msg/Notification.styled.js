import styled from 'styled-components';
import { Slide, ToastContainer } from 'react-toastify';

export const CustomToastContainer = styled(ToastContainer).attrs({
  // Default position can be overridden by props
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: 'light',
  transition: Slide,
})`
  .Toastify__toast--info {
    // background-color: #3498db;
    color: white;
    border-radius: 8px;
  }

  .Toastify__close-button {
    color: white;
  }

  .Toastify__progress-bar--info {
    background: #2980b9;
  }

  .Toastify__toast-container {
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 500px;
    z-index: 9999;
  }
`;
