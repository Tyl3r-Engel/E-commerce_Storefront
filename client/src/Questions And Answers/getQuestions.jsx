import React, { useContext } from 'react';
import axios from 'axios';
import { QuestionsContext } from './Questions.jsx';

export default async function getQuestions(cb) {
  const { data } = await axios.get('/api/qa/questions?product_id=44392');
  cb(data);
}
