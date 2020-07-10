import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatient());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getOnePatient(req.params.id);
  res.send(patient);
})

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post('/:id/entries', (req, res) => {
  const patient = patientService.getOnePatient(req.params.id);

  if (patient) {
    try{
      const newEntry = toNewEntry(req.body);
      const updatedPatient = patientService.addEntry(patient, newEntry);
      res.json(updatedPatient);
    } catch (e) {
      res.status(400).send(e.message);
    }
  }
})

export default router;
