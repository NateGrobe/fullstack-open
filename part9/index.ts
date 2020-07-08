import express from 'express';
import { calculateBmi } from './bmiCalculator'
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight: number = Number(req.query.weight);
  const height: number = Number(req.query.height);
  if(isNaN(weight) || isNaN(height)) 
    res.send({error: 'malformatted parameters'});
  
  res.send({
    weight,
    height,
    bmi: calculateBmi(weight, height)
  });
});

const PORT:number = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
