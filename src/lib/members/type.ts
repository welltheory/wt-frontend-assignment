export interface Member {
  id: string; // UUID or string ID
  firstName: string;
  lastName: string;
  dateOfBirth: string; // "YYYY-MM-DD"
  sex: "male" | "female" | "other";
  status: MemberStatus;
  photoUrl: string | null; // data URL when uploaded, else null
  createdAt: string; // ISO datetime
  updatedAt: string;
}

export enum MemberStatus {
  Active = "ACTIVE",
  Paused = "PAUSED",
}

export enum MemberSex {
  Male = "male",
  Female = "female",
  Other = "other",
}
