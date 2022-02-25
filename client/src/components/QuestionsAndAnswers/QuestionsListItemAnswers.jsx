/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */
import React, { useState, useContext } from 'react';
import axios from 'axios';
import getQuestions from './getQuestions.jsx';
import AnswerImages from './AnswerImages.jsx';
import { QuestionsContext } from './Questions.jsx';
import { AppContext } from '../../Context.js';
import date from './date';

export default function QuestionsListItemAnswers(props) {
  const { answer } = props;
  // eslint-disable-next-line no-unused-vars
  const [questions, setQuestions] = useContext(QuestionsContext);
  const { productId } = useContext(AppContext);
  const [clickedHelpful, setClickedHelpful] = useState(false);
  const [clickedReport, setClickedReport] = useState(false);

  if (answer === undefined) {
    return null;
  }

  async function incrementHelpfulness() {
    if (!clickedHelpful) {
      setClickedHelpful(true);
      await axios.put(`/api/qa/answers/${answer.id}/helpful`);
      await getQuestions((data) => {
        setQuestions(data);
      }, productId);
    }
  }

  async function setReported(event) {
    if (!clickedReport) {
      setClickedReport(true);
      event.target.innerText = 'Reported';
      await axios.put(`/api/qa/answers/${answer.id}/report`);
    }
  }

  function userName(name) {
    if (name.toLowerCase() === 'seller') {
      return <span style={{ display: 'inline', fontWeight: 'bold' }}>Seller</span>;
    }
    return <span style={{ display: 'inline' }}>{name}</span>;
  }

  const photos = answer.photos.map((photo) => (
    <AnswerImages key={`pic${Math.random() * 1000}`} src={photo} />
  ));

  return (
    <>
      <span className="answer">
        <h3 className="answerBody">A: </h3>
        <span className="answerBody" style={{ fontSize: '150%' }}>{answer.body}</span>
      </span>
      <div className="photoArray">{photos}</div>
      <p className="answerInfo">
        <span>by {userName(answer.answerer_name)}, {date(answer.date)} &nbsp; | &nbsp; Helpful? </span>
        <button type="button" onClick={incrementHelpfulness} className="yesButton invisibleButton">Yes</button>
        <span>({answer.helpfulness}) &nbsp; | &nbsp; </span>
        <button type="button" className="yesButton invisibleButton" onClick={setReported}>Report</button>
      </p>
    </>
  );
}
