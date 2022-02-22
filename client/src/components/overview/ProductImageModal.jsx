import React, { useState } from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#app');
export default function ImageModal(input) {
  const { path } = input;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div style={{ display: 'inline' }}>
      <button onClick={() => setModalIsOpen(true)} type="button" className="modal-button">
        <img
          className="mainImage"
          src={path}
          alt="n/a"
        />
      </button>
      <ReactModal
        isOpen={modalIsOpen}
        contentLabel="Example Modal"
      >
        <div className="overview-modal-container">
          <img className="overview-image" src={path} alt="n/a" />
          <button className="imageButton" type="button" onClick={() => setModalIsOpen(false)}>close</button>
        </div>
      </ReactModal>
    </div>
  );
}
