interface Input {
  weight: number,
  height: number
}

const parseArgs = (args: Array<string>): Input => {
  if (args.length !== 4) throw new Error ('Two arguments are needed');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      weight: Number(args[2]),
      height: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers');
  }
}

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

try {
  const { weight, height } = parseArgs(process.argv);
  console.log(calculateBmi(weight, height));
} catch (e) {
  console.log('Error, something bad happended, message: ', e.message);
}

