/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */
import React, { useState, useContext, useEffect } from 'react';
import getQuestions from './getQuestions.jsx';
import QuestionsList from './QuestionsList.jsx';
import QuestionsSearch from './QuestionsSearch.jsx';
import { AppContext } from '../../Context.js';

export const QuestionsContext = React.createContext();
export const SearchContext = React.createContext();

function Questions() {
  const [questions, setQuestions] = useState({});
  const [searchResults, setSearchResults] = useState({});
  const { productId } = useContext(AppContext);

  useEffect(() => {
    getQuestions((data) => {
      setQuestions(data);
    }, productId);
  }, [productId]);

  if (Object.keys(questions).length === 0 && productId !== undefined) {
    getQuestions((data) => {
      setQuestions(data);
    }, productId);
    return (null);
  }

  return (
    <QuestionsContext.Provider value={[questions, setQuestions]}>
      <SearchContext.Provider value={[searchResults, setSearchResults]}>
        <div className="questionsMain">
          <p className="questionsTitle">Questions & Answers</p>
          <QuestionsSearch />
          <QuestionsList />
        </div>
      </SearchContext.Provider>
    </QuestionsContext.Provider>
  );
}

export default Questions;
