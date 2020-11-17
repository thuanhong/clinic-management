import React from 'react';
import { TableData } from '@common/TableData';
import { mockPatients } from '@app/mock';

export const AllPatients = () => {
  return <TableData data={mockPatients} tableName={'Patients'} pathName={'/patients/patient-detail'} />;
};
