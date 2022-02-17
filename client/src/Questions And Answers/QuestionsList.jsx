/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-return-assign */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */
import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { AppContext } from '../Context.js';
import { QuestionsContext, SearchContext } from './Questions.jsx';
import QuestionsListItem from './QuestionsListItem.jsx';

export const ModalContext = React.createContext();

export default function QuestionsList() {
  const currentProduct = useContext(AppContext);
  const [questions, setQuestions] = useContext(QuestionsContext);
  const [searchResults, setSearchResults] = useContext(SearchContext);
  const [displayMoreQuestions, setDisplayMoreQuestions] = useState(true);
  const [displayQuantity, setDisplayQuantity] = useState(4);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  let subtitle;
  Modal.setAppElement('#app');

  function openModal() {
    setModalIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
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
        body: JSON.stringify(event.target.question.value),
        name: JSON.stringify(event.target.username.value),
        email: JSON.stringify(event.target.email.value),
        // eslint-disable-next-line radix
        product_id: parseInt(questions.product_id),
      },
    };
    closeModal();
    await axios(config);
  }

  function moreQuestions() {
    if (questions.results.length > displayQuantity) {
      if (questions.results.length >= displayQuantity + 2) {
        setDisplayQuantity((prevDisplayQuantity) => prevDisplayQuantity + 2);
      } else {
        setDisplayQuantity((prevDisplayQuantity) => prevDisplayQuantity + 1);
      }
    }
  }

  // eslint-disable-next-line consistent-return
  function moreQuestionsButton() {
    if (displayMoreQuestions) {
      if (questions.results.length <= displayQuantity) {
        setDisplayMoreQuestions(false);
      }
      return <button type="button" onClick={moreQuestions}>More Answered Questions</button>;
    }
  }
  var display;
  if (Object.keys(searchResults).length > 0) {
    display = searchResults;
  } else {
    display = questions;
  }

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ModalContext.Provider value={[modalIsOpen, setModalIsOpen]}>
      {display.results.slice(0, displayQuantity).map((question) => (
        <QuestionsListItem
          key={question.question_id}
          question={question}
        />
      ))}
      {moreQuestionsButton()}
      <button type="button" onClick={openModal}>Add A Question +</button>
      <Modal
        className="Modal"
        overlayClassName="Overlay"
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Ask Your Question</h2>
        <h3 ref={(_subtitle) => (subtitle = _subtitle)}>
          About the
          {' '}
          {currentProduct.data?.name}
        </h3>
        <form onSubmit={submitModal}>
          <textarea id="question" rows="4" cols="50" placeholder="Your Question" maxLength="1000" required />
          <input id="username" type="text" placeholder="Example: jackson11!." maxLength="60" required />
          <input id="email" type="text" placeholder="Example: jackson@email.com" maxLength="60" required />
          <p>For authentication reasons, you will not be emailed</p>
          <button type="button" onClick={closeModal}>close</button>
          <input type="submit" value="submit" />
        </form>
      </Modal>
    </ModalContext.Provider>
  );
}
