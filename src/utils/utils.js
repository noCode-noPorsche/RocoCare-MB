import { MedicalRecordType } from "../constants/enum";

export const formatDate = (date) => {
  if (!date) return "";
  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
};

export const getTypeLabel = (type) => {
  switch (type) {
    case MedicalRecordType.Invoice:
      return "Hóa Đơn";
    case MedicalRecordType.Prescription:
      return "Đơn Thuốc";
    case MedicalRecordType.ID:
      return "Giấy Tờ Tùy Thân";
    case MedicalRecordType.MedicalRecords:
      return "Hồ Sơ Bệnh Án";
  }
};
