import NavBar from '../../components/NavBarProjectPage/NavBarProjectPage.jsx';
import TaskList from '../../components/TaskList/TaskList';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  closeProject,
  createPayment,
  getHistoryProject,
  getOneProject,
  getPayment,
} from '../../redux/Projects/operations';
import {
  selectPaymentInfo,
  selectProject,
} from '../../redux/Projects/selectors.js';
import {
  closeTask,
  createNewTask,
  deleteOneTask,
  getAllTask,
  getOneTask,
  updateOneTask,
} from '../../redux/Task/operations.js';

import { selectTask, selectTasks } from '../../redux/Task/selectos.js';
import { TaskModal } from 'components/TaskModal/TaskModal.jsx';
import { getAttach, sendAttach } from '../../redux/Attach/operations.js';
// import { selectUserAttachm } from '../../redux/Attach/selectors.js';
import TaskWindow from 'components/TaskWindow/TaskWindow.jsx';
import { TaskListItem } from 'components/TaskList/TaskList.styled.js';
import {
  DeleteTaskBtn,
  ListItemBtn,
  ProjectPageContainer,
} from './ProjectPage.styled.js';
import { generationInviteCode } from '../../redux/InviteCode/operations.js';
import { selectCode, selectType } from '../../redux/InviteCode/selectors.js';
import {
  createComments,
  deleteComments,
  editComments,
  getComments,
} from '../../redux/Comments/operations.js';

import { selectAttachID } from '../../redux/Attach/selectors';
import { selectComments } from '../../redux/Comments/selectors.js';
import { DeleteTaskModal } from 'components/DeleteTaskModal/DeleteTaskModal.jsx';
export const ProjectPage = () => {
  const [userId] = useState(localStorage.getItem('userID'));
  const [modal, setModal] = useState(false);
  const { project_id } = useParams();
  const dispatch = useDispatch();
  const project = useSelector(selectProject);
  const allTask = useSelector(selectTasks);
  // const userAttachm = useSelector(selectUserAttachm);
  const [taskStatus, setTaskStatus] = useState(false);
  const selectorinviteCode = useSelector(selectCode);
  const userType = useSelector(selectType);
  const userTask = useSelector(selectTask);
  const [userRole, setUserRole] = useState('');
  const attacmID = useSelector(selectAttachID);
  const [userAttacmId, setUserAttacmId] = useState(attacmID);
  const userComments = useSelector(selectComments);
  const [taskDeleteModal, setTaskDeleteModal] = useState();
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const paymentInfo = useSelector(selectPaymentInfo);
  console.log(paymentInfo);

  // const projectPrice = useSelector(selectPrice);
  const navigate = useNavigate();

  const taskWindowHandle = useMemo(() => {
    return projectTask => {
      setTaskStatus(true);
      dispatch(getComments(projectTask._id));
      dispatch(getOneTask(projectTask._id));
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPayment(project_id));
    dispatch(getOneProject(project_id));
    dispatch(getAllTask(project_id));
    setUserAttacmId(attacmID);
  }, [dispatch, project_id, attacmID]);

  useEffect(() => {
    if (project) {
      if (userId === project.owner) {
        setUserRole('owner');
      } else if (project.clients.includes(userId)) {
        setUserRole('client');
      } else if (project.workers.includes(userId)) {
        setUserRole('worker');
      }
    }
  }, [userId, project]);

  const handleCloseTaskModal = task_id => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  };
  const handleCreateTask = data => {
    dispatch(createNewTask(data));
    setModal(false);
  };

  const httSendAttchm = data => {
    dispatch(sendAttach({ userData: data, project_id }));
  };

  const InviteCodeGeneration = data => {
    const userData = { type: data, project_id };
    dispatch(generationInviteCode(userData));
  };

  const handleCloseTask = taskId => {
    dispatch(closeTask(taskId));
    setTaskStatus(false);
  };

  const handleGetHistory = async () => {
    const resultAction = await dispatch(getHistoryProject(project_id));
    if (getHistoryProject.fulfilled.match(resultAction)) {
      const data = resultAction.payload;
      const blob = new Blob([data], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'history.log';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      console.error('Problem with installation:', resultAction.payload);
    }
  };

  const handleSubmiComment = data => {
    // if (!data) {
    //   alert('fill comment field');
    //   return;
    // }
    console.log(data);
    if (!userAttacmId && !data) {
      alert('Неможливо відправити пусте повідомлення');
      return;
    }
    const userData = {
      data,
      task_id: userTask._id,
      attachments: userAttacmId && userAttacmId ? [userAttacmId] : [],
    };
    dispatch(createComments(userData));
    setUserAttacmId(null);
  };
  const handleDeleteTask = () => {
    deleteTaskId && dispatch(deleteOneTask(deleteTaskId));
    setTaskDeleteModal(false);
    window.location.reload();
  };
  const handleCloseDeleteTask = task_id => {
    if (taskDeleteModal) {
      setTaskDeleteModal(false);
    } else {
      setTaskDeleteModal(true);
    }
    setDeleteTaskId(task_id);
  };

  const taskElements =
    allTask &&
    allTask.map(taskMap => (
      <TaskListItem key={taskMap._id}>
        <DeleteTaskBtn
          onClick={() => {
            handleCloseDeleteTask(taskMap._id);
          }}
          disabled={userRole !== 'owner'}
        >
          X
        </DeleteTaskBtn>
        <ListItemBtn
          style={{ width: '90%', padding: '10px 0' }}
          onClick={() => taskWindowHandle(taskMap)}
          disabled={project && project.locked}
        >
          {taskMap.name.toUpperCase()}
        </ListItemBtn>
      </TaskListItem>
    ));

  const handleGetAttachm = data => {
    dispatch(getAttach(data));
  };

  const handleChangeStatus = (userData, task_id) => {
    dispatch(updateOneTask({ userData, task_id }));
  };
  const handleChangeLoggedTime = (userData, task_id) => {
    dispatch(updateOneTask({ userData, task_id }));
  };

  const handleDeleteComment = data => {
    dispatch(deleteComments(data));
    window.location.reload();
  };

  const handleEditComment = data => {
    // console.log(data);
    dispatch(editComments(data));
    // window.location.reload();
  };

  const handleCloseProject = () => {
    dispatch(closeProject(project_id));
    navigate('/diploma_front/');
  };

  // const handlePayment = () => {
  //   dispatch(getPayment(project_id));
  // };
  //ОТРИМАТИ ЧЕК//
  // console.log(projectPrice);
  const handleCreatePayment = () => {
    // console.log(project_id);
    dispatch(createPayment(project_id));
  };

  const handlePayPayment = () => {
    navigate(`/diploma_front/payment/${project_id}`);
    // dispatch(payPayment(project_id));
  };
  return (
    <>
      <NavBar
        allUserTask={allTask}
        paymentInfo={paymentInfo}
        payPayment={handlePayPayment}
        history={handleGetHistory}
        type={userType}
        code={selectorinviteCode}
        inviteCode={InviteCodeGeneration}
        project={project}
        closeProject={handleCloseProject}
        role={userRole}
        projectStatus={project && project && project.locked}
        createPayment={handleCreatePayment}
        // peyment={handlePayment} if role === client handlePay else role === owner handlePayment
      />
      <ProjectPageContainer>
        <TaskList
          projectStatus={project && project && project.locked}
          tasks={allTask}
          role={userRole}
          taskEl={taskElements}
          createTaskModal={handleCloseTaskModal}
        />
        {taskDeleteModal && (
          <DeleteTaskModal
            deleteTask={handleDeleteTask}
            onClose={handleCloseDeleteTask}
          />
        )}

        {taskStatus && (
          <TaskWindow
            status={handleChangeStatus}
            closeTaskBtn={handleCloseTask}
            // openImg={handleOpenImg}
            deleteUserComment={handleDeleteComment}
            attach={handleGetAttachm}
            userComments={userComments}
            loggedTime={handleChangeLoggedTime}
            editComment={handleEditComment}
            commentSubmit={handleSubmiComment}
            role={userRole}
            task={userTask}
            sendUserAttach={httSendAttchm}
          />
        )}
        {modal && (
          <TaskModal
            userRole={userRole}
            onClose={handleCloseTaskModal}
            createTask={handleCreateTask}
            projectId={project_id}
          />
        )}
      </ProjectPageContainer>
    </>
  );
};
