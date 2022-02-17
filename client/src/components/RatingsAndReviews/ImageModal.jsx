import React, { useState } from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#app');
export default function ImageModal(input) {
  const { photo } = input;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div style={{ display: 'inline' }}>
      <button onClick={() => setModalIsOpen(true)} type="button" className="modal-button">
        <img
          src={photo.url}
          alt="n/a"
          width="50"
          height="50"
          style={{ padding: '3px' }}
        />
      </button>
      <ReactModal
        isOpen={modalIsOpen}
        contentLabel="Example Modal"
      >
        <div className="modal-container">
          <img className="image" src={photo.url} alt="n/a" />
          <button className="imageButton" type="button" onClick={() => setModalIsOpen(false)}>close</button>
        </div>
      </ReactModal>
    </div>
  );
}
