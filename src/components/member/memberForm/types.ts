import type { MemberSex, MemberStatus } from "../../lib/members/type";

export interface MemberFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  sex: MemberSex.Male;
  status: MemberStatus.Active;
}
