import React from 'react';
import { Entry } from '../types';
import { assertNever } from '../utils';
import HospitalEntryItem from './HospitalEntryItem';
import OccupationalHCItem from './OccupationalHCItem';
import HealthCheckItem from './HealthCheckItem';

const EntryInfo: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch(entry.type) {
    case 'Hospital':
      return <HospitalEntryItem entry={entry} />
    case 'OccupationalHealthcare':
      return <OccupationalHCItem entry={entry} />
    case 'HealthCheck':
      return <HealthCheckItem entry={entry} />
    default:
      return assertNever(entry);
  }
};

export default EntryInfo;