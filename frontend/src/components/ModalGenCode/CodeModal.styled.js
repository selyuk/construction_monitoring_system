import styled, { keyframes } from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1200;
  &:before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background-color: rgba(0, 0, 0, 0.8); */
    backdrop-filter: blur(0.5rem);
    /* Применение размытия */
    z-index: -1; /* Помещаем под фон модального окна */
`;

const Modal = styled.div`
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
`;

const Info = styled.div`
  width: 600px;
  border-radius: 10px;
  background-color: rgba(233, 233, 233, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 30px;
  position: relative;
`;

const NavButton = styled.button`
  padding: 10px;
  border-radius: 10px;
  border: 1px transparent;
  background-color: #8f8f8f;
  color: #ffffff;
  overflow-wrap: break-word;
  width: 200px;
  cursor: pointer;
  transition: background-color 0.5s ease, transform 0.3s ease,
    box-shadow 0.5s ease;

  &:hover {
    background-color: #6f6f6f;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    background-color: #cccccc;
    box-shadow: none;
  }
`;
const ButtonClose = styled.button`
  display: block;
  cursor: pointer;
  position: absolute;
  left: 5%;
  top: 5%;
  border-radius: 50%;
  background-color: transparent;
  border: transparent;
`;

const shimmer = keyframes`
  0% {
    background-position: -500px 0;
  }
  100% {
    background-position: 500px 0;
  }
`;

const StyledSpan = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background: linear-gradient(
    90deg,
    rgba(105, 105, 105, 0.8) 0%,
    rgba(169, 169, 169, 0.8) 50%,
    rgba(105, 105, 105, 0.8) 100%
  );
  background-size: 200% 200%;
  animation: ${shimmer} 2s linear infinite;
  padding: 5px 10px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: inline-block;

  &:hover {
    color: #ff0;
    background: linear-gradient(
      90deg,
      rgba(128, 128, 128, 0.8) 0%,
      rgba(192, 192, 192, 0.8) 50%,
      rgba(128, 128, 128, 0.8) 100%
    );
    background-size: 200% 200%;
    animation: ${shimmer} 2s linear infinite;
  }
`;

export { Info, StyledSpan,NavButton, Modal, Overlay, ButtonClose };
