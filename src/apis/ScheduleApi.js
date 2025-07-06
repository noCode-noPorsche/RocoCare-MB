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
  updateSchedule(id, body) {
    console.log("first", id);
    return http.put(`${pathAPI.userSchedule}/${id}`, body);
  },
  deleteSchedule(id) {
    return http.delete(`${pathAPI.userSchedule}?id=${id}`);
  },
};

export default scheduleApi;
