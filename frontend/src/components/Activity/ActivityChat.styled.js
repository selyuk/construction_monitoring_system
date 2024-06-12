import styled from 'styled-components';

const TaskActivityInput = styled.input`
  width: 250px;
  padding: 10px;
  box-sizing: border-box;
  resize: none; /* Prevent resizing */
  min-height: 50px;
`;
const TaskActivityHead = styled.h3``;
const TaskActivity = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const TaskChat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const TaskChatItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-width: 250px;
`;

const TaskChatList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 13px;
  max-height: 300px;
  overflow-x: auto;
  padding: 5px;
`;
const CommentContainer = styled.span`
  padding: 5px;
  background-color: #efefef;
  border-radius: 5px;
  position: relative;
  flex-wrap: wrap; /* Allow wrapping to the next line */
  max-width: 250px; /* Maximum width before wrapping */
  overflow-wrap: break-word; /* Break words if necessary */
`;
const DeleteCommentBtn = styled.button`
  position: absolute;
  background-color: red;
  color: white;
  font-size: 13px;
  top: 1%;
  right: 0.5%;
  &:disabled {
    background-color: grey;

    opacity: 0.5;
  }
`;
const EditCommentBtn = styled.button`
  background-color: blue;
  color: white;
  font-size: 13px;
  top: 1%;
  right: 5%;
  max-width: 100px;
  &:disabled {
    background-color: grey;

    opacity: 0.5;
  }
`;
const MediaBtn = styled.button`
  background-color: #b1b1b1;
  color: white;
  width: 100px;
  border-radius: 5px;
`;
export {
  TaskActivity,
  MediaBtn,
  TaskActivityHead,
  TaskActivityInput,
  EditCommentBtn,
  CommentContainer,
  DeleteCommentBtn,
  TaskChatItem,
  TaskChat,
  TaskChatList,
};
