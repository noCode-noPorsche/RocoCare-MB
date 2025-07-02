import pathAPI from "../constants/path";
import http from "../utils/http";

const scheduleApi = {
  getSchedule(params) {
    return http.get(pathAPI.userSchedule, {
      params,
    });
  },
  createSchedule(body) {
    return http.post(pathAPI.userSchedule, body);
  },
  updateSchedule(body) {
    return http.put(pathAPI.userSchedule, body);
  },
  deleteSchedule(id) {
    return http.delete(`${pathAPI.userSchedule}?id=${id}`);
  },
};

export default scheduleApi;
