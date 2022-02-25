/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-return-assign */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import React, { useState, useContext } from 'react';
import axios from 'axios';
import ReactList from 'react-list';
import { QuestionsContext } from './Questions.jsx';
import { AppContext } from '../../Context.js';
import getQuestions from './getQuestions.jsx';
import QuestionsListItemAnswers from './QuestionsListItemAnswers.jsx';
import AddAnAnswer from './AddAnAnswer.jsx';

export default function QuestionsListItem(props) {
  const { question } = props;
  // eslint-disable-next-line no-unused-vars
  const [questions, setQuestions] = useContext(QuestionsContext);
  const { productId } = useContext(AppContext);
  const [clickedHelpful, setClickedHelpful] = useState(false);
  const [displayQuantity, setDisplayQuantity] = useState(2);

  if (question === undefined) {
    return null;
  }

  const unsortedAnswers = Object.values(question.answers);
  const sortedAnswers = [];

  async function incrementHelpfulness() {
    if (!clickedHelpful) {
      setClickedHelpful(true);
      await axios.put(`/api/qa/questions/${question.question_id}/helpful`);
      await getQuestions((data) => {
        setQuestions(data);
      }, productId);
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
  const answer = sortedAnswers.slice(0, displayQuantity);

  const renderer = (index, key) => (
    <div className="eachAnswer" key={key}>
      <QuestionsListItemAnswers answer={answer[index]} />
    </div>
  );

  // eslint-disable-next-line consistent-return
  function moreAnswersButton() {
    const answerQty = Object.keys(question.answers).length;
    if (answerQty > 2) {
      if (answerQty <= displayQuantity) {
        return (
          <button type="button" className="seeMoreAnswers invisibleButton largeFont" onClick={() => setDisplayQuantity(2)}>Collapse answers</button>
        );
      }
      return (
        <button type="button" className="seeMoreAnswers invisibleButton largeFont" onClick={() => setDisplayQuantity(answerQty)}>See more answers</button>
      );
    }
  }

  return (
    <div className="question">
      <span className="question">
        <h5 className="questionBody">Q: </h5>
        <span className="questionBody" style={{ fontSize: '200%' }}>{question.question_body}</span>
      </span>
      <p className="questionInfo">
        <span> &nbsp; Helpful?</span>
        <button type="button" className="yesButton invisibleButton" onClick={incrementHelpfulness}>Yes</button>
        <span>({question.question_helpfulness}) &nbsp; | &nbsp; </span>
        <AddAnAnswer question={props.question} />
      </p>
      <div className="answerList">
        <ReactList
          // eslint-disable-next-line react/jsx-no-bind
          itemRenderer={renderer}
          length={displayQuantity}
          type="simple"
        />
      </div>
      {moreAnswersButton()}
    </div>
  );
}
