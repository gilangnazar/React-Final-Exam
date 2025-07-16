const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const departments = require('./routes/departments');
const doctors = require('./routes/doctors');
const medicines = require('./routes/medicines');
const users = require('./routes/users');
const roles = require('./routes/roles');
const auth = require('./routes/auth');

const pasien = require('./routes/pasien');
const pendaftaran = require('./routes/pendaftaran');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(bodyParser.json());

app.use('/api', departments);
app.use('/api', doctors);
app.use('/api', medicines);
app.use('/api', users);
app.use('/api', roles);
app.use('/api', auth);

app.use('/api', pasien);
app.use('/api', pendaftaran);

app.listen(PORT, () => {
  console.log(`app run in port: ${PORT}`);
});
