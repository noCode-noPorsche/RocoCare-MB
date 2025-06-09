import pathAPI from "../constants/path";
import http from "../utils/http";

const authApi = {
  loginWithGoogle(idToken) {
    return http.post(pathAPI.loginWithGoogle, { idToken });
  },
};

export default authApi;
