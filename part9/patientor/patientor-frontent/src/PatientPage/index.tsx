import React from 'react';
import axios from 'axios';
import { Icon, Button } from "semantic-ui-react";

import { useStateValue, updatePatient, setDiagnosesList } from '../state';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { Patient, Diagnosis } from '../types';
import EntryInfo from './EntryInfo';
import AddEntryModal from '../AddEntryModal';
import { NewHealthCheck } from '../AddEntryModal/AddEntryForm';


const PatientPage: React.FC = () => {
  const [{ patients, diagnosis }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string}>();
  let patient: Patient | undefined = Object.values(patients).find(p => p.id === id);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
  }

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
  }, [id, dispatch])

  if (!patient || !diagnosis) return null;

  const submitEntry = async (values: NewHealthCheck) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`
      );
      dispatch(updatePatient(updatedPatient));
      closeModal();
    } catch (e) {
      console.log(e)
    }
  };

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
            <EntryInfo entry={entry} />
        </div>
      )}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitEntry}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default PatientPage;