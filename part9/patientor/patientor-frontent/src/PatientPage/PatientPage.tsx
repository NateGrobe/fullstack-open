import React from 'react';
import axios from 'axios';
import { Container, Table, Button, Icon } from "semantic-ui-react";

import { useStateValue, updatePatient } from '../state';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { Patient } from '../types';


const PatientPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
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
    if(!patient){
        fetchPatient();
        console.log('here')
    } 
  }, [dispatch])

  if (!patient) return null;

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
      {patient.entries && <h3>Entries</h3>}
      {patient.entries.map(entry =>
        <div key={entry.date}>
          <p>{entry.date} {entry.description}</p>
          <ul>
          {entry.diagnosisCodes?.map(code => <li key={code}>{code}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PatientPage;