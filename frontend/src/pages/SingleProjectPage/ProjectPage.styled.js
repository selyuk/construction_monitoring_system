import styled from 'styled-components';

const ProjectPageContainer = styled.div`
    display: flex;
    margin: 30px 0 0 30px;
    justify-content: center;
    gap: 20px;
`;

const DeleteTaskBtn = styled.button`
  width: 10%;
  padding: 10px;
  background-color: #ff4d4d;
  color: white;
  border: none;

  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #ff1a1a;
    transform: scale(1.02);
  }
  &:disabled {
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
    transform: none;
  }
`;
const ListItemBtn = styled.button`
  width: 90%;
  padding: 10px 0;
  color: black;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease,
    box-shadow 0.3s ease;

  &:hover {
    background-color: #8f8f8f;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    background-color: #8f8f8f;
    transform: translateY(1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.5);
  }
  &:disabled {
    background-color: grey;
    color: white;
    cursor: not-allowed;
    opacity: 0.5;
    transform: none;
    box-shadow: none;
  }
`;

export { ProjectPageContainer, DeleteTaskBtn, ListItemBtn };
