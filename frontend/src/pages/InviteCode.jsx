import { useEffect, useState } from 'react';
import {
  AddProjectBtn,
  ChooseContainer,
  CloseWindowBtn,
  Container,
  DeleteProjectBtn,
  HelloH2,
  IntiveCodeContainer,
  InviteCodeBtn,
  InviteCodeInput,
  PorjectsList,
  ProjectBtn,
  ProjectListItem,
  ProjectsBtn,
  ProjectsContainer,
  SignOutBtn,
} from './InviteCode.styled';
import {
  createNewProject,
  deleteOneProject,
  getAllProjects,
} from '../redux/Projects/operations.js';
import { useDispatch, useSelector } from 'react-redux';

import { AddProjectModal } from '../components/AddProjectModal/AddProjectModal.jsx';
import { selectProjects } from '../redux/Projects/selectors.js';
import { useNavigate } from 'react-router-dom';
import { accpetInviteCode } from '../redux/InviteCode/operations.js';
import { selectProjectId } from '../redux/InviteCode/selectors.js';
import { DeleteProjectModal } from 'components/DeleteProjectModal/DeleteProjectModal';
// import { selectToken } from '../redux/User/selectos';

export const InviteCodePage = () => {
  const [projectWindow, setProjectWindow] = useState(false);
  const [inviteCodeWindow, setInviteCodeWindow] = useState(false);
  const [code, setCode] = useState('');
  const [modal, setModal] = useState(false);
  const projectId = useSelector(selectProjectId);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState(false);
  // const selectTokenUser = useSelector(selectToken);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allProjects = useSelector(selectProjects);

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  const OpenProjectWindow = e => {
    if (projectWindow) {
      setProjectWindow(false);
    } else {
      setProjectWindow(true);
    }
  };
  const OpenInviteCodeWindow = e => {
    if (inviteCodeWindow) {
      setInviteCodeWindow(false);
    } else {
      setInviteCodeWindow(true);
    }
  };

  const openProjectModal = e => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  };
  const createProjectModal = (name, description) => {
    const existingProject =
      allProjects && allProjects.find(project => project.name === name);
    if (existingProject) {
      alert('Проєкт з такою назвою вже існує. Оберіть іншу назву');
    } else {
      const data = {
        name,
        description,
      };
      dispatch(createNewProject(data));
      alert('Успішно Створенно');
      setModal(false);
      // window.location.reload();
    }
  };

  const handleOpenDeleteModal = projectID => {
    if (deleteModal) {
      setDeleteModal(false);
    } else {
      setDeleteModal(true);
    }
    setDeleteProjectId(projectID);
  };
  const handleDeleteProject = () => {
    deleteProjectId && dispatch(deleteOneProject(deleteProjectId));
    setDeleteModal(false);
    window.location.reload();
  };
  const projectListItem =
    allProjects &&
    allProjects.map(el => (
      // <Link to={`/diploma_front/project/${el._id}`} key={el._id}>
      <ProjectListItem key={el._id}>
        <ProjectBtn
          onClick={() => {
            navigate(`/diploma_front/project/${el._id}`);
          }}
        >
          {el.name.toUpperCase()}
        </ProjectBtn>
        <DeleteProjectBtn
          onClick={() => {
            handleOpenDeleteModal(el._id);
          }}
        >
          X
        </DeleteProjectBtn>
      </ProjectListItem>
      // </Link>
    ));

  const handleSignOut = () => {
    localStorage.setItem('token', '');
    localStorage.setItem('userID', '');
    navigate('/diploma_front/auth/login');
    window.location.reload();
  };

  const handleAcceptCode = inviteCode => {
    dispatch(accpetInviteCode(inviteCode));
    projectId && navigate(`/diploma_front/project/${projectId}`);
    // window.location.reload();
    // .then(() => {
    //   projectID && navigate(`/diploma_front/project/${projectID}`);
    // });
  };

  return (
    <>
      <SignOutBtn onClick={handleSignOut}>Вийти</SignOutBtn>
      <Container>
        <HelloH2>{'Вітаю'}</HelloH2>
        <ChooseContainer>
          <ProjectsBtn onClick={OpenInviteCodeWindow}>
            {'Ввести Код'}
          </ProjectsBtn>
          <ProjectsBtn onClick={OpenProjectWindow}>{'Мої проєкти'}</ProjectsBtn>
        </ChooseContainer>
      </Container>
      {inviteCodeWindow && (
        <IntiveCodeContainer>
          <CloseWindowBtn onClick={OpenInviteCodeWindow}>X</CloseWindowBtn>
          <InviteCodeInput
            placeholder="Код запрошення"
            value={code}
            onChange={e => setCode(e.target.value)}
          ></InviteCodeInput>
          <InviteCodeBtn onClick={() => handleAcceptCode(code)}>
            {'Надіслати'}
          </InviteCodeBtn>
        </IntiveCodeContainer>
      )}
      {deleteModal && (
        <DeleteProjectModal
          onClose={handleOpenDeleteModal}
          deleteProject={handleDeleteProject}
        />
      )}
      {projectWindow && (
        <ProjectsContainer>
          <CloseWindowBtn onClick={OpenProjectWindow}>X</CloseWindowBtn>
          <AddProjectBtn onClick={openProjectModal}>
            {'Додати Проєкт'}
          </AddProjectBtn>
          {modal && (
            <AddProjectModal
              onClose={openProjectModal}
              createProject={createProjectModal}
            ></AddProjectModal>
          )}
          {allProjects && <PorjectsList>{projectListItem}</PorjectsList>}
        </ProjectsContainer>
      )}
    </>
  );
};
