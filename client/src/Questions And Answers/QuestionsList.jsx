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

  function submitModal(event) {
    event.preventDefault();
    const config = {
      url: '/api/qa/questions',
      method: 'post',
      data: {
        body: JSON.stringify(event.target.question.value),
        name: JSON.stringify(event.target.username.value),
        email: JSON.stringify(event.target.email.value),
        product_id: parseInt(questions.product_id),
      },
    };
    axios(config).then((response) => console.log(response)).catch((err) => console.log(err.body));
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

  function moreQuestionsButton() {
    if (displayMoreQuestions) {
      if (questions.results.length <= displayQuantity) {
        setDisplayMoreQuestions(false);
      }
      return <button type="button" onClick={moreQuestions}>More Answered Questions</button>;
    }
  }

  if (Object.keys(searchResults).length > 0) {
    var display = searchResults;
  } else {
    var display = questions;
  }

  return (
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
        {/* <div>I am a modal</div> */}
        <form onSubmit={submitModal}>
          <textarea id="question" rows="4" cols="50" placeholder="Your Question" maxLength="1000" required />
          <input id="username" type="text" placeholder="Example: jackson11!." maxLength="60" required />
          <input id="email" type="text" placeholder="Example: jackson@email.com" maxLength="60" required />
          <p>For authentication reasons, you will not be emailed</p>
          <button onClick={closeModal}>close</button>
          <input type="submit" value="submit" />
        </form>
      </Modal>
    </ModalContext.Provider>
  );
}
