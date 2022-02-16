import React, { useState, useContext } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { QuestionsContext } from './QuestionsList.jsx';
import getQuestions from './getQuestions.jsx';
import QuestionsListItemAnswers from './QuestionsListItemAnswers.jsx';

export default function QuestionsListItem(props) {
  const { question } = props;
  const [questions, setQuestions] = useContext(QuestionsContext);
  const [clickedHelpful, setClickedHelpful] = useState(false);
  const unsortedAnswers = Object.values(question.answers);
  const sortedAnswers = [];

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
  const answer = sortedAnswers.map((a) => (
    <QuestionsListItemAnswers answer={a} />
  ));

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
        <button type="button">Add Answer</button>
      </p>
      {answer}
    </div>
  );
}
