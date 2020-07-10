import React from 'react';
import axios from 'axios';
import { Container, Table, Button, Icon } from "semantic-ui-react";

import { useStateValue, updatePatient, setDiagnosesList } from '../state';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { Patient, Diagnosis } from '../types';
import DiagnosisItem from './DiagnosisItem';


const PatientPage: React.FC = () => {
  const [{ patients, diagnosis }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string}>();
  let patient: Patient | undefined = Object.values(patients).find(p => p.id === id);

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(updatePatient(patientFromApi));
      } catch (e) {
        console.log(e);
      }
    }

    const fetchDiagnoses = async () => {
      try {
          const { data: diagnosisFromApi } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
          dispatch(setDiagnosesList(diagnosisFromApi));
      } catch (e) {
          console.log(e);
      }
    }
    fetchPatient();
    fetchDiagnoses();
  }, [dispatch])

  if (!patient || !diagnosis) return null;

  let genderIcon = <Icon name='genderless' />;

  if (patient.gender === 'male')
    genderIcon = <Icon name='mars' />;
  else
    genderIcon = <Icon name='venus' />;


  return (
    <div>
      <h2>{patient.name} {genderIcon}</h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      {patient.entries.length > 0 && <h3>Entries</h3>}
      {patient.entries.map(entry =>
        <div key={entry.date}>
          <p>{entry.date} {entry.description}</p>
          <ul>
          {entry.diagnosisCodes?.map(code => 
            <li key={code}>
              <DiagnosisItem diagnosis={Object.values(diagnosis).find(dia => dia.code === code)} />
            </li>
          )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PatientPage;