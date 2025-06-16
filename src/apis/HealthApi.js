import pathAPI from "../constants/path";
import http from "../utils/http";

const healthApi = {
  getHealthInformation() {
    return http.get(pathAPI.healthMetric);
  },
};

export default healthApi;
