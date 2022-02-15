import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import date from './date';
import { QuestionsContext, QuestionsUpdateContext } from './QuestionsList.jsx';

export default function QuestionsListItemAnswers(props) {
  const [questions, setQuestions] = useContext(QuestionsContext);
  // const { getQuestions } = useContext(QuestionsUpdateContext);
  let clicked = false;
  async function getQuestions() {
    const { data } = await axios.get('/api/qa/questions?product_id=44392');
    console.log(data);
    setQuestions({ data });
  }
  async function incrementHelpful() {
    if (!clicked) {
      clicked = true;
      console.log(clicked);
      await axios.put(`/api/qa/answers/${props.answer.id}/helpful`);
      getQuestions();
    }
  }

  // useEffect(() => {
  //   if (clicked) {
  //     console.log(clicked);
  //     console.log('render');
  //   }
  // }, [clicked]);

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
        {props.answer.answerer_name}
        ,
        {' '}
        {date(props.answer.date)}
        {' '}
        |  Helpful?
        {' '}
        <button type="button" onClick={incrementHelpful}>yes</button>
        {' '}
        (
        {props.answer.helpfulness}
        )  |
        {' '}
        <button type="button">Report</button>
      </p>
    </div>
  );
}
