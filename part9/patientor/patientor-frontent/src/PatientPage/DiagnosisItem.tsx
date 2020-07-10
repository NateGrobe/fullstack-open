import React from 'react';
import { Diagnosis }from '../types';

const DiagnosisItem: React.FC<{ diagnosis: Diagnosis | undefined }> = ({ diagnosis }) => {
    if (!diagnosis) return null
    return (
        <div>{diagnosis.code} {diagnosis.name}</div>
    )
};

export default DiagnosisItem;