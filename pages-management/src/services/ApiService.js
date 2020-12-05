import { httpRequest } from '@utils/HttpRequest';
import { EndPoints } from '@services/EndPoints';



const get_patient = async () => {
  return await httpRequest.get(EndPoints.PATIENT.get_patient);
};
const get_doctor = async () => {
    return await httpRequest.get(EndPoints.DOCTOR.get_doctor);
  };
  
export const ApiService = {
    get_patient,
    get_doctor,
};
