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
    get_list_patient: '/api/v1/patient',
    create_patient: 'api/v1/patient',
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
  STATIC:{
    get_static_patient: '/api/static-patient',
    get_static_payment: 'api/static-payment'
  }
};
