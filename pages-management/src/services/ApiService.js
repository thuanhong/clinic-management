import { httpRequest } from '@utils/HttpRequest';
import { EndPoints } from '@services/EndPoints';

// api patient
const get_list_patient = async () => {
  return await httpRequest.get(EndPoints.PATIENT.get_list_patient);
};

const create_patient = async (props) => {
  return await httpRequest.post(EndPoints.PATIENT.create_patient, { ...props });
};
const get_list_doctor = async () => {
  return await httpRequest.get(EndPoints.DOCTOR.get_list_doctor);
};

const get_patient_visit = async (params) => {
  return await httpRequest.get(EndPoints.PATIENT_VISIT.get_patient_visit + params);
};
// api patient visit
const create_patient_visit = async (props) => {
  return await httpRequest.post(EndPoints.PATIENT_VISIT.create_patient_visit, { ...props });
};

// api doctor
const create_doctor = async (props) => {
  return await httpRequest.post(EndPoints.PATIENT.create_doctor, props);
};
export const ApiService = {
  get_list_patient,
  create_patient,
  get_patient_visit,
  create_patient_visit,
  get_list_doctor,
  create_doctor,
};
