const calculateBmi = (weight: number, height: number): string => {
  if (height > 0 ) {
    const bmi: number = weight / height;

    if (bmi > 3) {
      return 'Obese (unhealthy weight)';
    } else if (bmi < 3 && bmi > 2.5 ) {
      return 'Overweight (unhealthy weight)';
    } else if (bmi < 2.5 && bmi > 1.85) {
      return 'Normal weight (healthy weight)';
    } else {
      return 'Underweight (unhealthy weight)';
    }

  } else {
    throw new Error('Height must be greater than zero');
  }
}

console.log(calculateBmi(180, 74))
