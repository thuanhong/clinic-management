import React from 'react';
import { TableData } from '@common/TableData';
import { mockDoctors } from '@app/mock';

export const AllDoctors = () => {
  return <TableData data={mockDoctors} tableName={'Doctors'} pathName={'/doctors/doctor-detail'} />;
};
