import pathAPI from "../constants/path";
import http from "../utils/http";

const authApi = {
  loginWithGoogle(idToken) {
    return http.post(pathAPI.loginWithGoogle, { idToken });
  },
  register(body) {
    return http.post(pathAPI.register, body);
  },
  login(body) {
    return http.post(pathAPI.login, body);
  },
};

export default authApi;
