import React, { useState } from 'react';
import Modal from 'react-modal';
import getQuestions from './getQuestions.jsx';
// import { QuestionsContext } from '../Context.js';
// eslint-disable-next-line import/extensions
import QuestionsListItem from './QuestionsListItem.jsx';

export const QuestionsContext = React.createContext();
export const QuestionsUpdateContext = React.createContext();

// store current helpfulness and when it changes implement a useeffect to update the list

export default function QuestionsList() {
  const [questions, setQuestions] = useState({});
  const [displayMoreQuestions, setDisplayMoreQuestions] = useState(true);
  const [displayQuantity, setDisplayQuantity] = useState(2);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  let subtitle;

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

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

  if (Object.keys(questions).length === 0) {
    getQuestions((data) => {
      setQuestions(data);
    });
    return (null);
  }
  return (
    <QuestionsContext.Provider value={[questions, setQuestions]}>
      {questions.results.slice(0, displayQuantity).map((question) => (
        <QuestionsListItem
          key={question.question_id}
          question={question}
        />
      ))}
      {moreQuestionsButton()}
      <button type="button" onClick={openModal}>Add A Question +</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    </QuestionsContext.Provider>
  );
}
