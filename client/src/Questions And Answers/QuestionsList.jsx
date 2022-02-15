import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
// import { QuestionsContext } from '../Context.js';
// eslint-disable-next-line import/extensions
import QuestionsListItem from './QuestionsListItem.jsx';

export const QuestionsContext = React.createContext();
export const QuestionsUpdateContext = React.createContext();

// store current helpfulness and when it changes implement a useeffect to update the list

export default function QuestionsList() {
  const [questions, setQuestions] = useState({});
  async function getQuestions() {
    const { data } = await axios.get('/api/qa/questions?product_id=44392');
    setQuestions({ data });
  }

  if (Object.keys(questions).length === 0) {
    getQuestions();
    return (null);
  }

  return (
    <QuestionsContext.Provider value={[questions, setQuestions]}>
      {questions.data.results.map((question) => (
        <QuestionsListItem
          key={question.question_id}
          question={question}
        />
      ))}
    </QuestionsContext.Provider>
  );
}
