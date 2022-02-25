const express = require('express');
const axios = require('axios');
const path = require('path');
const {
  API_ROUTE, API_KEY1, API_KEY2, API_KEY3, API_KEY4,
} = require('./config');

const app = express();
app.use(express.static(path.join(__dirname, '../client/dist/')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let requestCounter = 1;
const getApiKey = () => {
  switch (requestCounter) {
    case 1:
      return API_KEY1;
    case 2:
      return API_KEY2;
    case 3:
      return API_KEY3;
    case 4:
      return API_KEY4;
    default:
      requestCounter = 2;
      return API_KEY1;
  }
};

app.all('/api/*', async (req, res, next) => {
  try {
    const config = {
      url: `${API_ROUTE}${req.url.slice(5, req.url.length)}`,
      method: `${req.method}`,
      data: req.body,
      headers: {
        Authorization: getApiKey(),
      },
    };
    const { data } = await axios(config);
    res.json(data);
    res.end();
    requestCounter += 1;
    next();
  } catch (error) {
    res.status(error.status || 500).send({
      error: {
        status: error.status || 500,
        message: error.message || 'Internal Server Error',
      },
    });
  }
});

app.listen(3000, () => {
  console.log('running on port 3000');
});
