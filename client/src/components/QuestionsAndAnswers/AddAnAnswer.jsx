/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { AppContext } from '../../Context.js';
import { QuestionsContext } from './Questions.jsx';
import getQuestions from './getQuestions.jsx';
import AnswerImages from './AnswerImages.jsx';

export default function AddAnAnswer(props) {
  // eslint-disable-next-line no-unused-vars
  const [questions, setQuestions] = useContext(QuestionsContext);
  const currentProduct = useContext(AppContext);
  const { question } = props;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [photos, setPhotos] = useState([]);

  Modal.setAppElement('#app');

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function addPhoto(event) {
    event.preventDefault();
    if (event.target.file.value !== '') {
      setPhotos([...photos, event.target.file.value]);
    }
  }

  function addPhotoButton() {
    if (photos.length < 5) {
      return (
        <form onSubmit={addPhoto}>
          <span>You can add a total of {5 - photos.length} more pictures.</span>
          <input id="file" type="url" />
          <input type="submit" value="Upload Picture" />
        </form>
      );
    }
    return <span>Maximum amount of pictures reached</span>;
  }

  async function submitModal(event) {
    event.preventDefault();
    const config = {
      url: `/api/qa/questions/${question.question_id}/answers`,
      method: 'post',
      data: {
        body: event.target.question.value,
        name: event.target.username.value,
        email: event.target.email.value,
        photos,
      },
    };
    closeModal();
    await axios(config);
    await getQuestions((data) => {
      setQuestions(data);
    });
  }

  return (
    <>
      <button type="button" className="yesButton invisibleButton" onClick={openModal}>Add Answer</button>
      <Modal
        className="Modal"
        overlayClassName="Overlay"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <h3 className="modalText">Submit your Answer</h3>
        <h5 className="modalText">{currentProduct.data?.name} Q: {question.question_body}</h5>
        <form onSubmit={submitModal}>
          <textarea id="question" rows="4" cols="50" placeholder="Your Answer" maxLength="1000" required />
          <input id="username" type="text" placeholder="Example: jack543!" maxLength="60" required />
          <input id="email" type="email" placeholder="Example: jack@email.com" maxLength="60" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required />
          <p className="modalText">For authentication reasons, you will not be emailed</p>
          <button type="button" onClick={closeModal}>close</button>
          <input type="submit" value="submit" />
        </form>
        {addPhotoButton()}
        <div className="uploadThumbs">
          {photos.map((photo) => (
            <AnswerImages key={`pic${Math.random() * 1000}`} src={photo} />
          ))}
        </div>
      </Modal>
    </>
  );
}
