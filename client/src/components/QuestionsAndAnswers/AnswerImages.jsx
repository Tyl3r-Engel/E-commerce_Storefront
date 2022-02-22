/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import Modal from 'react-modal';

export default function AnswerImages(props) {
  const { src } = props;
  const [modalIsOpen, setModalIsOpen] = useState(false);

  Modal.setAppElement('#app');

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <span className="answerPic">
      <input
        type="image"
        src={src}
        className="thumbnail"
        alt="answerpic"
        onClick={openModal}
      />
      <Modal
        className="picModal"
        overlayClassName="Overlay"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <img src={src} alt="answerpic" height="800px" width="auto" style={{ display: 'inline-block' }} />
      </Modal>
    </span>
  );
}
