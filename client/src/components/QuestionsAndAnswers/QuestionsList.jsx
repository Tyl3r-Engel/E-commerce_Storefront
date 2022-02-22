/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-return-assign */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */
import React, { useState, useContext, useEffect } from 'react';
import ReactList from 'react-list';
import { QuestionsContext, SearchContext } from './Questions.jsx';
import QuestionsListItem from './QuestionsListItem.jsx';
import AddAQuestion from './AddAQuestion.jsx';

export default function QuestionsList() {
  const [questions, setQuestions] = useContext(QuestionsContext);
  const [searchResults, setSearchResults] = useContext(SearchContext);
  const [displayQuantity, setDisplayQuantity] = useState(2);

  if (Object.keys(questions).length === 0) {
    return (
      <div>
        <h4>No questions have been asked for this product, why not be the first?</h4>
        {AddAQuestion()}
      </div>
    );
  }

  function moreQuestions() {
    setDisplayQuantity(questions.results.length);
  }

  // eslint-disable-next-line consistent-return
  function moreQuestionsButton() {
    if (questions.results.length <= displayQuantity) {
      return <button type="button" className="bigButtons" onClick={() => setDisplayQuantity(4)}>Collapse questions</button>;
    }
    return <button type="button" className="bigButtons" onClick={moreQuestions}>More Answered Questions</button>;
  }

  var display;
  if (Object.keys(searchResults).length > 0) {
    display = searchResults;
  } else {
    display = questions;
  }

  const renderer = (index, key) => (
    <div key={key}>
      <QuestionsListItem
        question={display.results[index]}
      />
    </div>
  );

  return (
    <>
      <div className="questionList">
        <ReactList
          itemRenderer={renderer}
          length={displayQuantity}
          type="simple"
        />
      </div>
      {moreQuestionsButton()}
      <AddAQuestion />
    </>
  );
}
