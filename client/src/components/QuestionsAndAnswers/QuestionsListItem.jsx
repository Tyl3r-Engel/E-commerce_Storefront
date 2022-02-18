/* eslint-disable no-return-assign */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import React, { useState, useContext } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { AppContext } from '../../Context.js';
import { QuestionsContext } from './Questions.jsx';
import getQuestions from './getQuestions.jsx';
import QuestionsListItemAnswers from './QuestionsListItemAnswers.jsx';

export default function QuestionsListItem(props) {
  const { question } = props;
  const currentProduct = useContext(AppContext);
  // eslint-disable-next-line no-unused-vars
  const [questions, setQuestions] = useContext(QuestionsContext);
  const [clickedHelpful, setClickedHelpful] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [displayQuantity, setDisplayQuantity] = useState(2);

  const unsortedAnswers = Object.values(question.answers);
  const sortedAnswers = [];
  let subtitle;

  function openModal() {
    setModalIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  async function submitModal(event) {
    event.preventDefault();
    const photos = [];
    if (event.target.photos !== undefined) {
      photos.push(event.target.photos.value);
    }
    const config = {
      url: `/api/qa/questions/${question.question_id}/answers`,
      method: 'post',
      data: {
        body: JSON.stringify(event.target.question.value),
        name: JSON.stringify(event.target.username.value),
        email: JSON.stringify(event.target.email.value),
        photos,
      },
    };
    closeModal();
    await axios(config);
    await getQuestions((data) => {
      setQuestions(data);
    });
  }

  async function incrementHelpfulness() {
    if (!clickedHelpful) {
      setClickedHelpful(true);
      await axios.put(`/api/qa/questions/${question.question_id}/helpful`);
      await getQuestions((data) => {
        setQuestions(data);
      });
    }
  }

  for (let i = 0; i < unsortedAnswers.length; i += 1) {
    if (unsortedAnswers[i].answerer_name.toLowerCase() === 'seller') {
      sortedAnswers.push(unsortedAnswers[i]);
      unsortedAnswers.splice(i, 1);
    }
  }

  for (let j = 0; j < unsortedAnswers.length; j += 1) {
    sortedAnswers.push(unsortedAnswers[j]);
  }
  const answer = sortedAnswers.slice(0, displayQuantity).map((a) => (
    <QuestionsListItemAnswers key={a.id} answer={a} question_id={question.question_id} />
  ));

  function moreAnswers() {
    if (Object.keys(question.answers).length > displayQuantity) {
      if (Object.keys(question.answers).length >= displayQuantity + 2) {
        setDisplayQuantity((prevDisplayQuantity) => prevDisplayQuantity + 2);
      } else {
        setDisplayQuantity((prevDisplayQuantity) => prevDisplayQuantity + 1);
      }
    }
  }

  // eslint-disable-next-line consistent-return
  function moreAnswersButton() {
    if (Object.keys(question.answers).length > 2) {
      if (Object.keys(question.answers).length <= displayQuantity) {
        return <button type="button" onClick={() => setDisplayQuantity(2)}>Collapse Answers</button>;
      }
      return <button type="button" onClick={moreAnswers}>More Answers</button>;
    }
  }

  return (
    <div className="question">
      <h1 className="questionBody">
        Q:
        {' '}
        {question.question_body}
      </h1>
      <p>
        Helpful?
        {' '}
        <button type="button" style={{ textDecorationLine: 'underline' }} onClick={incrementHelpfulness}>Yes</button>
        {' '}
        (
        {question.question_helpfulness}
        )
        {' | '}
        <button type="button" onClick={openModal}>Add Answer</button>
        <Modal
          className="Modal"
          overlayClassName="Overlay"
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Submit your Answer</h2>
          <h3 ref={(_subtitle) => (subtitle = _subtitle)}>
            {currentProduct.data?.name}
            :
            {' '}
            {question.question_body}
          </h3>
          <form onSubmit={submitModal}>
            <textarea id="question" rows="4" cols="50" placeholder="Your Answer" maxLength="1000" required />
            <input id="username" type="text" placeholder="Example: jack543!" maxLength="60" required />
            <input id="email" type="text" placeholder="Example: jack@email.com" maxLength="60" required />
            <p>For authentication reasons, you will not be emailed</p>
            <input id="file" type="file" />
            <button type="button" onClick={closeModal}>close</button>
            <input type="submit" value="submit" />
          </form>
        </Modal>
      </p>
      {answer}
      {moreAnswersButton()}
    </div>
  );
}
