import { httpRequest } from '@utils/HttpRequest';
import { EndPoints } from '@services/EndPoints';

const login = (username, password) => {
  let body_data = {
    username,
    password,
  };

  return httpRequest.post(EndPoints.AUTHENTICATION.login, body_data);
};

const check_auth = () => {
  return httpRequest.get(EndPoints.HEALTH.health_check_authenticated);
};

export const AuthService = {
  login,
  check_auth,
};
