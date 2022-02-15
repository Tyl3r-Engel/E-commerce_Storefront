import React from 'react';
// eslint-disable-next-line import/extensions
import QuestionsListItemAnswers from './QuestionsListItemAnswers.jsx';

export default function QuestionsListItem(props) {
  const { question } = props;
  const unsortedAnswers = Object.values(question.answers);

  const sortedAnswers = [];
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
      {answer}
    </div>
  );
}
