// import { NavContainer, NavButton, NavP } from './NavBarProjectPage.styled.js';

import { useState } from 'react';
import {
  Container,
  InviteBtn,
  NavButton,
  NavContainer,
  NavP,
  WrapperDiv,
} from './NavBarProjectPage.styled';
import { UpdateProjectModal } from 'components/AddProjectModal/UpdateProjectModal';
import { useDispatch } from 'react-redux';
import { updateProject } from '../../redux/Projects/operations';
// import { NotificationMessage } from 'components/Notification-Msg/Notification';
import { useNavigate } from 'react-router-dom';
import { CodeModal } from 'components/ModalGenCode/CodeModal';

const NavBar = ({
  project,
  inviteCode,
  code,
  role,
  paymentInfo,
  payPayment,
  allUserTask,
  history,
  projectStatus,
  closeProject,
  createPayment,
}) => {
  const dispatch = useDispatch();
  // const { state } = useLocation();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState();
  // const [workerCode, setWorkerCode] = useState('');
  // const [clientCode, setClientCode] = useState('');
  const [codeModal, setCodeModal] = useState('');

  // useEffect(() => {
  //   if (type === 'worker') {
  //     setWorkerCode(code);
  //   } else if (type === 'client') {
  //     setClientCode(code);
  //   }
  // }, [type, code]);
  const openInfoModal = () => {
    if (openModal) {
      setOpenModal(false);
    } else {
      setOpenModal(true);
    }
  };
  const openCodeModal = () => {
    if (codeModal) {
      setCodeModal(false);
    } else {
      setCodeModal(true);
    }
  };

  const handleUpdate = data => {
    const userData = { ...data, workers: [], clients: [] };

    dispatch(updateProject({ userData, project_id: project._id }));
    setOpenModal(false);
    window.location.reload();
  };

  const handleInviteCode = e => {
    inviteCode(e.target.value);
    // if (e.target.value === 'worker') {
    //   // setMessageWorker(true);
    // } else if (e.target.value === 'client');
  };
  // setMessageClient(true)
  const handleBack = () => {
    navigate('/diploma_front/');
  };

  // const paymentModal = () => {
  //   if (payment) {
  //     setPayment(false);
  //   } else {
  //     setPayment(true);
  //   }
  // };

  return (
    <NavContainer>
      <Container>
        <WrapperDiv>
          <NavButton onClick={handleBack}> {'<'} </NavButton>
          <NavP>{project && project.name.toUpperCase()}</NavP>
          {/* Project Name */}
          <NavButton
            onClick={openInfoModal}
            disabled={role !== 'owner' || projectStatus}
          >
            {'Інформація'}
          </NavButton>
          {/* INFO */}
          {/* <NavP>{project && project.start_time}</NavP>  */}
          {/* Project Status */}
        </WrapperDiv>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '15px',
          }}
        >
          {/* payment */}
          {role === 'owner' && (
            <NavButton
              onClick={createPayment}
              disabled={allUserTask && allUserTask.length <= 0}
            >
              Створити чек
            </NavButton>
          )}
          {role === 'client' && (
            <NavButton onClick={payPayment} disabled={!paymentInfo}>
              Сплатити
            </NavButton>
          )}
          {/* {payment && <PaymentModal onClose={paymentModal} />} */}

          <InviteBtn
            onClick={openCodeModal}
            disabled={role !== 'owner' || projectStatus}
          >
            Стоврити Запрошення
          </InviteBtn>
          {codeModal && (
            <CodeModal
              onClose={openCodeModal}
              Click={handleInviteCode}
              getCode={code}
            />
          )}
        </div>

        {openModal && (
          <UpdateProjectModal
            onClose={openInfoModal}
            updateProject={handleUpdate}
          />
        )}
        <WrapperDiv>
          <NavButton onClick={history}>Отримати Історію</NavButton>
          {/* GET HISTORY */}
          <NavButton
            disabled={role !== 'owner' || projectStatus}
            onClick={closeProject}
          >
            Закрити проєкт
          </NavButton>
          {/* modalwindow проверка нажатия */}
          {/* END PROJECT */}
          {/* <NavButton disabled={role !== 'owner'}>X</NavButton> */}
          {/* CANCEL END PROJECT */}
        </WrapperDiv>
      </Container>
    </NavContainer>
  );
};

export default NavBar;
