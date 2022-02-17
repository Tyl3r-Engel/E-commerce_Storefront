import axios from 'axios';

export default async function getQuestions(cb) {
  const { data } = await axios.get('/api/qa/questions?product_id=44392&count=100');
  cb(data);
}
