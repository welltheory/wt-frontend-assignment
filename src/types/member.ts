export interface Member {
  id: string; // UUID or string ID
  firstName: string;
  lastName: string;
  dateOfBirth: string; // "YYYY-MM-DD"
  sex: "male" | "female" | "other";
  status: "ACTIVE" | "PAUSED";
  photoUrl: string | null; // data URL when uploaded, else null
  createdAt: string; // ISO datetime
  updatedAt: string; // ISO datetime
}

export interface PaginatedResponse<Member> {
  data: Member[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
