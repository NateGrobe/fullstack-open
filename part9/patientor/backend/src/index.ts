import express from 'express';
import diagnosesRouter from './routes/diagnoses'
const cors = require('cors')
const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  res.send('pong!');
});

app.use('/api/diagnoses', diagnosesRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
