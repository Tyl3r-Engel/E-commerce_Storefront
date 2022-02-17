/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */
import React, { useState, useContext } from 'react';
import axios from 'axios';
import getQuestions from './getQuestions.jsx';
import { QuestionsContext } from './Questions.jsx';
import date from './date';

export default function QuestionsListItemAnswers(props) {
  // eslint-disable-next-line no-unused-vars
  const [questions, setQuestions] = useContext(QuestionsContext);
  const [clickedHelpful, setClickedHelpful] = useState(false);
  const [clickedReport, setClickedReport] = useState(false);

  async function incrementHelpfulness() {
    if (!clickedHelpful) {
      setClickedHelpful(true);
      await axios.put(`/api/qa/answers/${props.answer.id}/helpful`);
      await getQuestions((data) => {
        setQuestions(data);
      });
    }
  }

  async function setReported(event) {
    if (!clickedReport) {
      setClickedReport(true);
      event.target.innerText = 'Reported';
      await axios.put(`/api/qa/answers/${props.answer.id}/report`);
      // eslint-disable-next-line no-param-reassign
    }
  }

  function userName(name) {
    if (name.toLowerCase() === 'seller') {
      return <text style={{ fontWeight: 'bold' }}>{name}</text>;
    }
    return <text>{name}</text>;
  }
  return (
    <div>
      <h4 className="answerBody">
        A:
        {' '}
        {props.answer.body}

      </h4>
      <p className="answerInfo">
        Answered by
        {' '}
        {userName(props.answer.answerer_name)}
        ,
        {' '}
        {date(props.answer.date)}
        {' '}
        |  Helpful?
        {' '}
        <button type="button" onClick={incrementHelpfulness} style={{ textDecorationLine: 'underline' }}>Yes</button>
        {' '}
        (
        {props.answer.helpfulness}
        )  |
        {' '}
        <button type="button" onClick={setReported}>Report</button>
      </p>
    </div>
  );
}
