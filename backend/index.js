const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: 'https://localhost:5173',
    credentials: true,
  })
);

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`app run in port: ${PORT}`);
});
