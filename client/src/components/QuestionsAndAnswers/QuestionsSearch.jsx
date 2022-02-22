/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
import React, { useState, useContext, useEffect } from 'react';
import { QuestionsContext, SearchContext } from './Questions.jsx';

export default function QuestionsSearch() {
  const [questions, setQuestions] = useContext(QuestionsContext);
  const [searchResults, setSearchResults] = useContext(SearchContext);
  const [search, setSearch] = useState('');

  if (Object.keys(questions).length === 0) {
    return null;
  }

  function searchChange(event) {
    event.preventDefault();
    setSearch(event.target.value);
  }

  useEffect(() => {
    const searchQuestions = { product_id: questions.product_id, results: [] };
    const questionsArr = questions.results;

    if (search.length < 3) {
      setSearchResults({});
    }

    if (search.length > 2) {
      for (let i = 0; i < questions.results.length; i += 1) {
        if (questionsArr[i].question_body.toLowerCase().includes(search.toLowerCase())) {
          searchQuestions.results.push(questionsArr[i]);
        }
      }

      setSearchResults(searchQuestions);
    }
  }, [search]);

  return (
    <div className="questionSearch">
      <input
        className="questionSearch"
        name="search"
        type="text"
        placeholder="Have a question? Search for answers…"
        value={search}
        onChange={searchChange}
      />
    </div>
  );
}
