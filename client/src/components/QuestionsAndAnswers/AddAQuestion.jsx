/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { AppContext } from '../../Context.js';
import { QuestionsContext, SearchContext } from './Questions.jsx';
import getQuestions from './getQuestions.jsx';

export default function AddAQuestion() {
  const { productId, currentProduct } = useContext(AppContext);
  const [questions, setQuestions] = useContext(QuestionsContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  Modal.setAppElement('#app');

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  async function submitModal(event) {
    event.preventDefault();
    const config = {
      url: '/api/qa/questions',
      method: 'post',
      data: {
        body: event.target.question.value,
        name: event.target.username.value,
        email: event.target.email.value,
        // eslint-disable-next-line radix
        product_id: parseInt(questions.product_id),
      },
    };
    closeModal();
    await axios(config);
    await getQuestions((data) => {
      setQuestions(data);
    }, productId);
  }

  return (
    <span>
      <button
        type="button"
        className="bigButtons"
        onClick={openModal}
      >
        Add A Question
      </button>

      <Modal
        className="Modal"
        overlayClassName="Overlay"
        isOpen={modalIsOpen}
        contentLabel="Example Modal"
      >

        <h3 className="modalText">Ask Your Question</h3>
        <h5 className="modalText">About the {currentProduct?.name}</h5>

        <form onSubmit={submitModal}>
          <textarea id="question" rows="4" cols="50" placeholder="Your Question" maxLength="1000" required />
          <input id="username" type="text" placeholder="Example: jackson11!." maxLength="60" required />
          <input id="email" type="email" placeholder="Example: jack@email.com" maxLength="60" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required />
          <p className="modalText">For authentication reasons, you will not be emailed</p>
          <button type="button" onClick={closeModal}>close</button>
          <input type="submit" value="submit" />
        </form>
      </Modal>
    </span>
  );
}
