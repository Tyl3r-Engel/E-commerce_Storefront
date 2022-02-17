const express = require('express');
const axios = require('axios');
const path = require('path');
const { API_ROUTE, API_KEY } = require('./config');

const app = express();
app.use(express.static(path.join(__dirname, '../client/dist/')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.all('/api/*', async (req, res, next) => {
  const config = {
    url: `${API_ROUTE}${req.url.slice(5, req.url.length)}`,
    method: `${req.method}`,
    data: `${req.body}`,
    headers: {
      Authorization: API_KEY,
    },
  };
  const { data } = await axios(config);
  res.json(data);
  res.end();
  next();
});

app.listen(3000, () => {
  console.log('running on port 3000');
});
