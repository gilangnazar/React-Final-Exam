const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const departments = require('./routes/departments');
const doctors = require('./routes/doctors');

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

app.use('/api', departments);
app.use('/api', doctors);

app.listen(PORT, () => {
  console.log(`app run in port: ${PORT}`);
});
