import styled, { keyframes } from 'styled-components';

const HelloH2 = styled.h2``;
const ChooseContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d9d9d9;
  gap: 20px;
  padding: 27px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
`;

const ProjectsBtn = styled.button`
  border-radius: 10px;
  border: 1px solid transparent;
  padding: 20px;
  background-color: #8f8f8f;
  color: #ffffff;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease;

  &:hover {
    background-color: #6f6f6f;
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.35);
    transform: translateY(-2px);
  }
`;
const Container = styled.div`
  position: absolute;
  display: flex;
  gap: 50px;
  flex-direction: column;
  align-items: center;
  top: 30%;
  left: 42%;
  padding: 15px;
`;
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
const SignOutBtn = styled.button`
  position: absolute;
  top: 3%;
  right: 5%;
  text-decoration: underline;
`;

const IntiveCodeContainer = styled.div`
  padding: 37px;
  position: absolute;
  top: 60%;
  left: 20%;
  display: flex;
  gap: 30px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #d9d9d9;
  border: 1px solid #000000;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
  animation: ${fadeIn} 0.3s ease-out;
`;
const CloseWindowBtn = styled.button`
  position: absolute;
  top: 3%;
  left: 3%;
 
  }
`;
const InviteCodeInput = styled.input`
  width: 275px;
  height: 48px;
  background-color: white;
  border-color: transparent;
`;
const InviteCodeBtn = styled.button`
  width: 275px;
  font-size: 24px;
  font-weight: 400;
  color: white;
  background-color: #8f8f8f;
  padding: 10px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #6f6f6f;
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.35);
    transform: translateY(-2px);
`;

const ProjectsContainer = styled.div`
  position: absolute;
  top: 60%;
  left: 70%;
  display: flex;
  gap: 13px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #d9d9d9;
  border: 1px solid #000000;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
  animation: ${fadeIn} 0.3s ease-out;
  max-height: 300px;

  padding: 30px;
`;

const AddProjectBtn = styled.button`

  background-color: white;
  font-size: 16px;
  font-weight: 400;
  padding: 20px;
  width: 280px;
  border: none; 
  border-radius: 8px; 
  transition: all 0.3s ease; 

  &:hover {
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1); 
    transform: scale(1.02); 
  }

  &:active {
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    transform: scale(1); 
`;

const ProjectListItem = styled.li`
  width: 275px;
  background-color: white;
  display: flex;

  font-weight: 400;
  font-size: 16px;
  border-radius: 8px;
`;
const DeleteProjectBtn = styled.button`
  z-index: 100;
  background-color: #ff4d4d;
  color: white;
  width: 11%;
  padding: 10px;
  border: none;

  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease,
    box-shadow 0.3s ease;

  &:hover {
    background-color: #ff1a1a;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }
`;

const ProjectBtn = styled.button`
  width: 89%;
  padding: 20px;
  animation: ${fadeIn} 0.3s ease-out; /* Apply the animation */
  
  /* Add additional styles for the button */
  border: none;
  // border-radius: 8px;
  background-color: #8f8f8f;
  color: white;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #6f6f6f;
    transform: translateY(-2px);
`;
const PorjectsList = styled.ul`
  display: flex;
  gap: 10px;
  max-height: 350px;
  overflow-y: auto;
  width: 300px;
  flex-direction: column;
`;
export {
  HelloH2,
  ProjectListItem,
  ChooseContainer,
  PorjectsList,
  ProjectBtn,
  ProjectsContainer,
  AddProjectBtn,
  DeleteProjectBtn,
  ProjectsBtn,
  SignOutBtn,
  Container,
  IntiveCodeContainer,
  CloseWindowBtn,
  InviteCodeBtn,
  InviteCodeInput,
};
