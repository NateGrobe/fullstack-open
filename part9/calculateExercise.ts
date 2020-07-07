interface TrainingData {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercise = (exerciseHours: Array<number>, targetHours: number): TrainingData => {
  const periodLength = exerciseHours.length;
  const trainingDays: number = exerciseHours.filter(d => d !== 0).length;
  const success: boolean = exerciseHours.filter(d => d >= 2).length === exerciseHours.length;
  let rating: number;
  let ratingDescription: string;

  if (success) {
    rating = 3;
    ratingDescription = 'well done'
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
  }
}

console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1], 2));
