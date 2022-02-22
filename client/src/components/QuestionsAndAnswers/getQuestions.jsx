import axios from 'axios';

export default async function getQuestions(cb, productId) {
  const { data } = await axios.get(`/api/qa/questions?product_id=${productId}&count=100`);
  cb(data);
}
