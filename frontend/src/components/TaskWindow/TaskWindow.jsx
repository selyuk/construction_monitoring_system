import {
  OptionTask,
  SeletTask,
  TaskContainerProject,
  TaskDescription,
  TaskDescriptionContainer,
  TaskDescriptionSpan,
  TaskDetailsContainer,
  TaskDetailsInput,
  TaskDetailsLi,
  TaskDetailsListContainer,
  TaskDetailsP,
  TaskDetailsPrice,
  TaskDetailsPriceStatus,
  TaskDetailsSpan,
  TaskDetailsUl,
  TaskDropDown,
  TaskHead,
  TaskInput,
  TaskLockedBtn,
} from './TaskWindow.styled';
import moment from 'moment-timezone';
import { ActivityChat } from 'components/Activity/ActivityChat';
import { NotificationMessage } from 'components/Notification-Msg/Notification';
import { useRef } from 'react';

const TaskWindow = ({
  task,
  sendUserAttach,
  role,
  commentSubmit,
  userComments,
  closeTaskBtn,
  attach,
  editComment,
  deleteUserComment,
  status,
  loggedTime,
}) => {
  const fileInputRef = useRef(null);
  // console.log(task);
  const handleFileChange = e => {
    if (!e.target.files[0]) {
      return;
    }
    const file = e.target.files;
    const formdata = new FormData();

    file && formdata.append('file', file[0]);
    sendUserAttach(formdata);
  };
  const converTime = date => {
    if (!date) {
      return 'No Time';
    }

    const formattedTime = moment
      .unix(date)
      .tz('Europe/Kiev')
      .format('DD.MM.YYYY HH:mm');
    return formattedTime;
  };

  const handleStatus = e => {
    const data = { ...task, status: e.target.value };
    status(data, task._id);
  };
  const handleLoggedTime = e => {
    setTimeout(() => {
      const data = { ...task, logged_time: e.target.value };
      e.target.value > 0 && loggedTime(data, task._id);
    }, 5000);
  };
  const handlePrice = e => {
    setTimeout(() => {
      const data = { ...task, uah_price: e.target.value };
      e.target.value > 0 && loggedTime(data, task._id);
    }, 5000);
  };

  return (
    <TaskContainerProject>
      <TaskDescriptionContainer>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            marginBottom: '30px',
          }}
        >
          <TaskHead>{task && task.name.toUpperCase()}</TaskHead>
          <TaskInput
            type="file"
            onChange={handleFileChange}
            accept=".jpg, .jpeg, .png"
            disabled={task && task.locked}
            ref={fileInputRef}
          />
          <TaskDescription>{'Опис'}</TaskDescription>
          <TaskDescriptionSpan>{task && task.description}</TaskDescriptionSpan>
        </div>
        <NotificationMessage />
        <ActivityChat
          deleteComment={deleteUserComment}
          locked={task && task.locked}
          userRole={role}
          editUserCom={editComment}
          sendAttacmh={sendUserAttach}
          attachm={attach}
          submit={commentSubmit}
          comments={userComments}
          time={converTime}
          getAttachOnclick={attach}
        />
      </TaskDescriptionContainer>
      <TaskDetailsContainer>
        <TaskLockedBtn
          onClick={() => {
            closeTaskBtn(task._id);
          }}
          disabled={role !== 'owner' || (task && task.locked)}
        >
          Закрити Завдання
        </TaskLockedBtn>
        <TaskDropDown>
          <SeletTask
            disabled={(task && task.locked) || role !== 'owner'}
            onChange={handleStatus}
            value={task && task.status}
          >
            <OptionTask value="to_do">{'Треба зробити'}</OptionTask>
            <OptionTask value="in_progress">{'У процесі'}</OptionTask>
            <OptionTask value="done">{'Виконано'}</OptionTask>
          </SeletTask>
        </TaskDropDown>
        <TaskDetailsListContainer>
          <TaskDetailsP>{'Деталі'}</TaskDetailsP>
          <TaskDetailsUl>
            <TaskDetailsLi>
              {'Час на виконання'}
              {/* owner */}
              <TaskDetailsSpan>{`${
                task && task.tracking_time
              } h`}</TaskDetailsSpan>
            </TaskDetailsLi>
            <TaskDetailsLi>
              {'Час витраченно'}
              {/* worker */}
              <TaskDetailsInput
                type="number"
                placeholder={task && task.logged_time}
                min="0"
                max="100"
                id="number"
                // value={task && task.logged_time}
                disabled={role !== 'worker' || (task && task.locked)}
                onChange={handleLoggedTime}
                // value={task && task.logged_time}
                // {role === 'owner' || 'client'}
              />
            </TaskDetailsLi>
            <TaskDetailsLi>
              {'Початок робіт'}
              <TaskDetailsSpan>
                {converTime(task && task.creation_time)}
              </TaskDetailsSpan>
            </TaskDetailsLi>
            <TaskDetailsLi>
              {'Кінець робіт'}
              <TaskDetailsSpan>
                {converTime(task && task.lock_time)}
              </TaskDetailsSpan>
            </TaskDetailsLi>
            <TaskDetailsLi>
              {'Ціна робіт'}
              <TaskDetailsPrice
                type="number"
                id="number"
                placeholder={task && `${task.uah_price} грн`}
                disabled={role !== 'owner' || (task && task.locked)}
                onChange={handlePrice}
              />
            </TaskDetailsLi>
            <TaskDetailsLi>
              <TaskDetailsPriceStatus>
                {task && task.payment_status}
              </TaskDetailsPriceStatus>
            </TaskDetailsLi>
          </TaskDetailsUl>
        </TaskDetailsListContainer>
      </TaskDetailsContainer>
    </TaskContainerProject>
  );
};

export default TaskWindow;
