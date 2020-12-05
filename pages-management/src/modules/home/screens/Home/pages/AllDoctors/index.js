import React, {useEffect, useState} from 'react';
import { TableData } from '@common/TableData';
import { mockDoctors } from '@app/mock';
import {ApiService} from '@services/ApiService';

export const AllDoctors = () => {
  const [listData,setListData] = useState([])
  useEffect( ()=>{
     ApiService.get_list_doctor().then((res)=>{
      if(res.statusCode===200){
        
        setListData(listData.concat(res.msg))
      }
      else{
        return console.log(res.msg)
      }

    })
  },[])
  if (listData === undefined || listData.length == 0) {
    return "LOADING"
    // array empty or does not exist
}
  return <TableData data={listData} tableName={'Patients'} pathName={'/patients/patient-detail'} />;
};
