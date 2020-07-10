import React from 'react';
import { HospitalEntry } from '../types';
import { Card, Icon } from 'semantic-ui-react';
import DiagnosisItem from './DiagnosisItem';
import { useStateValue } from '../state';

const HospitalEntryItem: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
    const [{ diagnosis},] = useStateValue();
    return (
      <Card fluid>
        <Card.Content>
          <h3>{entry.date} <Icon name='hospital' /></h3> 
          <p>{entry.description}</p>
          <p><strong>Doctor:</strong> {entry.specialist}</p>
          <h3>Diagnosis</h3>
          <ul>
            {entry.diagnosisCodes?.map(code => 
                <li key={code}>
                <DiagnosisItem diagnosis={Object.values(diagnosis).find(dia => dia.code === code)} />
                </li>
            )}
          </ul>
        </Card.Content>
      </Card>
    )
}

export default HospitalEntryItem;