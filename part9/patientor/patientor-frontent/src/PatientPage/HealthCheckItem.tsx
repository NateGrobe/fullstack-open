import React from 'react';
import { HealthCheckEntry } from '../types';
import { Card, Icon } from 'semantic-ui-react';

const HealthCheckItem: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
    return (
      <Card fluid>
        <Card.Content>
          <h3>{entry.date} <Icon name='heart' /></h3> 
          <p>{entry.description}</p>
          <p><strong>Doctor:</strong> {entry.specialist}</p>
        </Card.Content>
      </Card>
    )
}

export default HealthCheckItem;