/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercise } from './calculateExercise';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);
  if (isNaN(weight) || isNaN(height))
    res.send({ error: 'malformatted parameters' });

  res.send({
    weight,
    height,
    bmi: calculateBmi(weight, height)
  });
}); 

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body: any = req.body;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const dailyExercise: Array<number> = body.daily_exercises;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const target: number = body.target;

  if(!dailyExercise || !target) res.send({ error: 'parameters missing' });

  if(isNaN(target)) res.send({ error: 'malformatted parameters' });

  dailyExercise.forEach(d => {
    if(isNaN(d)) res.send({ error: 'malformatted parameters' });
  });

  res.send(calculateExercise(dailyExercise, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
