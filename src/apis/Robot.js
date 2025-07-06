import pathAPI from "../constants/path";
import http from "../utils/http";

const robotApi = {
  controlRobot(body) {
    console.log("first", body);
    return http.post(pathAPI.robot, body);
  },
};

export default robotApi;
