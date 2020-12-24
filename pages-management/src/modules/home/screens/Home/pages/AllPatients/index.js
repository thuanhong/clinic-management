import React, { useEffect, useState } from 'react';
import { TableData } from '@common/TableData';
import Typography from '@material-ui/core/Typography';
import { ApiService } from '@services/ApiService';
import { LoadingPage } from '@common/LoadingPage';

export const AllPatients = () => {
  const [listData, setListData] = useState();
  useEffect(() => {
    ApiService.get_list_patient().then((res) => {
      if (res.statusCode === 200) {
        setListData(res.msg);
      }
    });
  }, []);
  if (!listData) {
    return <LoadingPage />;
    // array empty or does not exist
  } else if (listData.length === 0) {
    return (
      <Typography variant='h1' component='h2'>
        No data found
      </Typography>
    );
  }
  return <TableData data={listData} tableName={'Patients'} pathName={'/patients/patient-detail'} />;
};
