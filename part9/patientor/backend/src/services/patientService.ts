import patients from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient } from '../types';
import { v4 as uuidv4 } from 'uuid';

const getPatients = (): Patient[] => {
  return patients;
};

const getOnePatient = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

const getNonSensitivePatient = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patient
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getOnePatient,
  getNonSensitivePatient,
  addPatient
};
