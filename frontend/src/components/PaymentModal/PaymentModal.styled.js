import styled from 'styled-components';

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
    backdrop-filter: blur(1.5rem);
    /* Применение размытия */
    z-index: -1; /* Помещаем под фон модального окна */
`;

const Modal = styled.div`
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
`;

const Info = styled.div`
  width: 400px;
  border-radius: 10%;
  background-color: rgba(233, 233, 233, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  position: relative;
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

const FormCreateProject = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 20px;
`;

const InfoContainer = styled.div``;

const ProjectBtnSave = styled.button`
width: 275px;
font-size: 24px;
font-weight: 400;
color: white;
background-color: #8f8f8f;
padding: 3px;
transition: all 0.3s ease;

&:hover {
  background-color: #6f6f6f;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.35);
  transform: translateY(-2px);

`;

const InputField = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;
export {
  Info,
  Modal,
  Overlay,
  ButtonClose,
  FormCreateProject,
  ProjectBtnSave,
  InfoContainer,
  InputField,
};
