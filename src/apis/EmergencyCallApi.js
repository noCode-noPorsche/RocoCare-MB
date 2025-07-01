import pathAPI from "../constants/path";
import http from "../utils/http";

const emergencyCallApi = {
  getEmergencyCall() {
    return http.get(pathAPI.emergencyCall);
  },
  updateEmergencyCall(body) {
    return http.post(pathAPI.emergencyCall, body);
  },
};

export default emergencyCallApi;
