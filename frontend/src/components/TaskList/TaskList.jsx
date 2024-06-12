// import { useContext } from 'react';
import {
  CreateTaskButton,
  TaskContainer,
  TaskListContainer,
  TaskListUl,
} from './TaskList.styled';
// import { ModalContext } from 'context';

const TaskList = ({ createTaskModal, taskEl, role, projectStatus }) => {
  return (
    <TaskContainer>
      <TaskListContainer>
        <CreateTaskButton onClick={createTaskModal} disabled={role !== 'owner' || projectStatus}>
          + Створити Завдання
        </CreateTaskButton>

        {taskEl && taskEl.length > 0 ? (
          <TaskListUl>{taskEl}</TaskListUl>
        ) : (
          <h2>Завдань наразі немає</h2>
        )}
      </TaskListContainer>

      {/*//userAttach={sendAttach} */}
    </TaskContainer>
  );
};

export default TaskList;
