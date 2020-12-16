export const EndPoints = {
  AUTHENTICATION: {
    login: '/auth/login/',
    logout: '/auth/logout',
    token: '/auth/token/',
  },
  HEALTH: {
    health_check: '/health',
    health_check_authenticated: '/health/test-auth-request',
  },
  PATIENT: {
    patient: '/api/v1/patient',
  },
  PATIENT_VISIT: {
    get_patient_visit: '/api/v1/patient-visit/',
    get_list_patient_visit: '/api/v1/patient-visit',
    create_patient_visit: 'api/v1/patient-visit',
  },
  DOCTOR: {
    get_list_doctor: '/api/v1/doctor',
    create_doctor: 'api/v1/profile',
  },
  UTIL: {
    upload_image: '/api/upload-image/',
    get_drug: '/api/v1/store-item',
  },
};
