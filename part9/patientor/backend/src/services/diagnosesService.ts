import diagnoses from '../../data/diagnoses.json';
import { Diagnoses } from '../types';

const getDiagnoses = (): Diagnoses[] => {
  return diagnoses;
};

const addDiagnoses = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnoses
};
