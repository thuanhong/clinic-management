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
  PATIENT:{
    get_patient:'/api/v1/patient',
  },
  DOCTOR:{
    get_doctor:'/api/v1/doctor',
  }
};
