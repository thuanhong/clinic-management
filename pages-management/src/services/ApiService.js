import { httpRequest } from '@utils/HttpRequest';
import { EndPoints } from '@services/EndPoints';

// api patient
const get_list_patient = async () => {
  return await httpRequest.get(EndPoints.PATIENT.get_list_patient);
};

const create_patient = async (props) => {
  // let body_data = {
  //   first_name,
  //   last_name,
  //   gender,
  //   address,
  //   birth_date,
  //   identity_card,
  //   insurance
  console.log({...props})
  // }
  return await httpRequest.post(EndPoints.PATIENT.create_patient,{...props});
};
const get_list_doctor = async () => {
  return await httpRequest.get(EndPoints.DOCTOR.get_list_doctor);
};
// api doctor
const create_doctor = async () => {
  let body_data = {
    username,
    password,
    permissions,
    first_name,
    last_name,
    gender,
    address,
    birth_date,
    title,
    email,
  }
  return await httpRequest.post(EndPoints.PATIENT.create_doctor, body_data);
};
export const ApiService = {
  get_list_patient,
  create_patient,
  get_list_doctor,
  create_doctor,

};
