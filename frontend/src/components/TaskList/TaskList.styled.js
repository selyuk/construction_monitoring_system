import styled from 'styled-components';

const TaskContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
`;

const CreateTaskButton = styled.button`
  margin-bottom: 15px;
  width: 100%;
  background-color: #d9d9d9;
  padding: 15px 0;
  font-weight: 700;
  font-size: 25px;
  line-height: 30px;
  color: #000000;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #bfbfbf;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
  }

  &:active {
    background-color: #a6a6a6;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
    transform: scale(1.02);
  }
  &:disabled {
    background-color: #f0f0f0;
    color: #a1a1a1;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
`;

const TaskListUl = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px 0;
  background-color: #d9d9d9;
  width: 100%;
  max-height: 450px;
  overflow-x: auto;
  direction: rtl;
  gap: 5px;
`;
const TaskListItem = styled.li`
  display: flex;
  position: relative;
  justify-content: center;
  background-color: white;
  color: black;
  min-width: 275px;
`;
const TaskListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
`;
export {
  TaskListContainer,
  TaskContainer,
  CreateTaskButton,
  TaskListUl,
  TaskListItem,
};
