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
  update(body) {
    return http.put(pathAPI.update, body);
  },
  profile() {
    return http.get(pathAPI.profile);
  },
  changePassword(body) {
    return http.post(pathAPI.changePassword, body);
  },
};

export default authApi;
