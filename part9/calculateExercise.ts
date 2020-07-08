interface TrainingData {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface StartingValues {
  exerciseHours: Array<number>,
  targetHours: number
}

const parseArgs = (args: Array<string>): StartingValues => {
  if (isNaN(Number(args[2]))) throw new Error('The target must be a number');

  const th = Number(args[2]);
  const eh: Array<number> = [];
  
  args.forEach((a, i) => {
    if(isNaN(Number(a)) && i > 2) throw new Error('Daily exercise must be a number');
    if (i > 2) eh.push(Number(a));
  });

  return {
    exerciseHours: eh,
    targetHours: th
  };
};

const calculateExercise = (exerciseHours: Array<number>, targetHours: number): TrainingData => {
  const periodLength = exerciseHours.length;
  const trainingDays: number = exerciseHours.filter(d => d !== 0).length;
  const success: boolean = exerciseHours.filter(d => d >= 2).length === exerciseHours.length;
  let rating: number;
  let ratingDescription: string;

  if (success) {
    rating = 3;
    ratingDescription = 'well done';
  } else if (trainingDays > periodLength / 2) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'gotta work harder!';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetHours,
    average: exerciseHours.reduce((a, b) => a + b, 0) / periodLength
  };
};

try {
  const { exerciseHours, targetHours } = parseArgs(process.argv);
  console.log(calculateExercise(exerciseHours, targetHours));
} catch(e) {
  console.log('Error, something bad happened, message: ', e.message);
}
