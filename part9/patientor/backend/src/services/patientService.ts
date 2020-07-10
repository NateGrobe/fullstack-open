import patients from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient, NewEntry, Entry } from '../types';
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

const addEntry = (patient: Patient, entry: NewEntry): Patient => {
  const newEntry: Entry =  {
    ...entry,
    id: uuidv4()
  };

  const updatedPatient = {
    ...patient,
    entries: patient.entries.concat(newEntry)
  };

  const patientToUpdate = patients.find(p => p.id === patient.id);
  if(patientToUpdate) patientToUpdate.entries.concat(newEntry);

  return updatedPatient;
}

export default {
  getPatients,
  getOnePatient,
  getNonSensitivePatient,
  addPatient,
  addEntry
};