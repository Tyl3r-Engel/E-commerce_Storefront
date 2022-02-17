import React, { useState, useContext } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { AppContext } from '../Context.js';
import { QuestionsContext } from './Questions.jsx';
import getQuestions from './getQuestions.jsx';
import QuestionsListItemAnswers from './QuestionsListItemAnswers.jsx';

export default function QuestionsListItem(props) {
  const { question } = props;
  const currentProduct = useContext(AppContext);
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
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function submitModal(event) {
    event.preventDefault();
    const config = {
      url: `/api/qa/questions${question.question_id}/answers`,
      method: 'post',
      data: {
        body: JSON.stringify(event.target.question.value),
        name: JSON.stringify(event.target.username.value),
        email: JSON.stringify(event.target.email.value),
        photos: event.target.photos.value || [],
      },
    };
    axios(config).then((response) => console.log(response)).catch((err) => console.log(err.body));
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
    <QuestionsListItemAnswers answer={a} />
  ));

  function moreAnswers() {
    if (Object.keys(question.answers).length > displayQuantity) {
      console.log('yeet');
      if (Object.keys(question.answers).length >= displayQuantity + 2) {
        setDisplayQuantity((prevDisplayQuantity) => prevDisplayQuantity + 2);
      } else {
        setDisplayQuantity((prevDisplayQuantity) => prevDisplayQuantity + 1);
      }
    }
  }

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
          {/* <div>I am a modal</div> */}
          <form onSubmit={submitModal}>
            <textarea id="question" rows="4" cols="50" placeholder="Your Answer" maxLength="1000" required />
            <input id="username" type="text" placeholder="Example: jack543!" maxLength="60" required />
            <input id="email" type="text" placeholder="Example: jack@email.com" maxLength="60" required />
            <p>For authentication reasons, you will not be emailed</p>
            <input id="file" type="file" />
            <button onClick={closeModal}>close</button>
            <input type="submit" value="submit" />
          </form>
        </Modal>
      </p>
      {answer}
      {moreAnswersButton()}
    </div>
  );
}
