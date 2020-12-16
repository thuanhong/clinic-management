import React, { useEffect, useState } from 'react';
import { TableData } from '@common/TableData';
import { LoadingPage } from '@common/LoadingPage';
import { ApiService } from '@services/ApiService';

export const AllDoctors = () => {
  const [listData, setListData] = useState();
  useEffect(() => {
    ApiService.get_list_doctor().then((res) => {
      if (res.statusCode === 200) {
        setListData(res.msg);
      }
    });
  }, []);

  if (listData === undefined) {
    return <LoadingPage />;
  } else if (listData.length === 0) {
    return <h1>No data found</h1>;
  }
  return <TableData data={listData} tableName={'Doctors'} pathName={'/doctors/doctor-detail'} />;
};
