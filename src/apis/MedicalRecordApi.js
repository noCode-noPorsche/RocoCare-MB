import pathAPI from "../constants/path";
import http from "../utils/http";

const medicalRecordApi = {
  getMedicalRecord() {
    return http.get(pathAPI.medicalRecord);
  },
  createMedicalRecord(body) {
    return http.post(pathAPI.medicalRecord, body);
  },
  updateMedicalRecord(body) {
    return http.put(pathAPI.medicalRecord, body);
  },
  deleteMedicalRecord(id) {
    return http.delete(`${pathAPI.medicalRecord}?id=${id}`);
  },
};

export default medicalRecordApi;
