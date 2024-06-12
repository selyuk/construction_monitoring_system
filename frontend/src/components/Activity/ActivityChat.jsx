import { useState } from 'react';
import {
  CommentContainer,
  DeleteCommentBtn,
  EditCommentBtn,
  MediaBtn,
  TaskActivity,
  TaskActivityHead,
  TaskActivityInput,
  TaskChat,
  TaskChatItem,
  TaskChatList,
} from './ActivityChat.styled';
import { TaskSubmitBtn } from 'components/TaskWindow/TaskWindow.styled';
import { ImgModal } from 'components/ModalImg/ModalImg';
import { DeleteCommentModal } from 'components/DeleteComment/DeleteCommentModal';
import { EditComment } from 'components/EditCommentModal/EditComment';

export const ActivityChat = ({
  comments,
  submit,
  time,
  locked,
  getAttachOnclick,
  userRole,
  editUserCom,
  deleteComment,
}) => {
  const [userComment, setUserComment] = useState('');
  const [imgModal, setImgModal] = useState(false);
  const [deleComment, setDeleComment] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const [editComment, setEditComment] = useState(false);
  const [commentData, setCommentData] = useState('');
  const [commnetAttacmh, setcommnetAttacmh] = useState(null);
  const closeModal = () => {
    if (imgModal) {
      setImgModal(false);
    } else if (!imgModal) {
      setImgModal(true);
    }
  };

  const handleSubmit = () => {
    submit(userComment);
    setUserComment('');
  };

  const handleCloseModal = comment_id => {
    if (deleComment) {
      setDeleComment(false);
    } else {
      setDeleComment(true);
    }
    setCommentId(comment_id);
  };

  const handleEditCommentModal = (comment_id, comdata, comAttachm) => {
    if (editComment) {
      setEditComment(false);
    } else {
      setEditComment(true);
    }
    setCommentId(comment_id);
    setCommentData(comdata);
    setcommnetAttacmh(comAttachm);
  };

  const handleEditComment = data => {
    // console.log({ data, comment_id: commentId });
    editUserCom({ data, comment_id: commentId });
  };
  const userID = localStorage.getItem('userID');
  //  justifyContent: 'space-between'
  const comment =
    comments &&
    comments.map(com => (
      <TaskChatItem key={com._id}>
        <div>
          <span style={{ display: 'flex', justifyContent: 'space-between' }}>
            {com.username}
          </span>
          <span
            style={{
              color: '#686868',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            {time(com.last_updated)}
            <span>{com.edited && 'змінено'}</span>
          </span>
        </div>

        <CommentContainer>
          {com.data}
          <DeleteCommentBtn
            onClick={() => {
              handleCloseModal(com._id);
            }}
            disabled={locked || userID !== com.user_id}
          >
            X
          </DeleteCommentBtn>

          {com.attachments.length > 0 && (
            <MediaBtn
              onClick={() => {
                getAttachOnclick(com.attachments[0]);
                setImgModal(true);
              }}
            >
              {'Медія'}
            </MediaBtn>
          )}
          {imgModal && <ImgModal onClose={closeModal} />}
        </CommentContainer>
        <EditCommentBtn
          onClick={() => {
            handleEditCommentModal(com._id, com.data, com.attachments);
          }}
          disabled={locked || userID !== com.user_id}
        >
          Редагування
        </EditCommentBtn>
      </TaskChatItem>
    ));

  return (
    <TaskActivity>
      {/* <TaskInput type="file" onChange={handleFileChange} /> */}
      <TaskActivityHead>{'Коментарі'}</TaskActivityHead>
      <TaskChat>
        <TaskChatList>{comment}</TaskChatList>
        <TaskActivityInput
          as="textarea"
          rows="5"
          onChange={e => {
            setUserComment(e.target.value);
          }}
          value={userComment && userComment}
          disabled={locked}
        />
        <TaskSubmitBtn onClick={handleSubmit} disabled={locked}>
          {'Відправити'}
        </TaskSubmitBtn>
      </TaskChat>
      {deleComment && (
        <DeleteCommentModal
          onClose={handleCloseModal}
          deleteComment={() => commentId && deleteComment(commentId)}
        />
      )}
      {editComment && (
        <EditComment
          onClose={handleEditCommentModal}
          editComment={handleEditComment}
          value={commentData}
          attachm={commnetAttacmh}
        />
      )}
    </TaskActivity>
  );
};
