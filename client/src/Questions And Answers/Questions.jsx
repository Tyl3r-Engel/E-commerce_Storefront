import React from 'react';
// eslint-disable-next-line import/extensions
import QuestionsList from './QuestionsList.jsx';
// eslint-disable-next-line import/extensions
import QuestionsSearch from './QuestionsSearch.jsx';
// import QuestionsListItem from './QuestionsListItem.jsx';

function Questions() {
  return (
    <div>
      <QuestionsSearch />
      <QuestionsList />
    </div>
  );
}

export default Questions;
