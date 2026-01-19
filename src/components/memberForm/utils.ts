import * as Yup from "yup";
import { MemberSex, MemberStatus, type Member } from "../../lib/members/type";
import type { MemberFormData } from "./types";

const DEFAULT_INITIAL_FORM_DATA: MemberFormData = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  sex: MemberSex.Male,
  status: MemberStatus.Active,
};
const MEMBER_FORM_FIELDS = Object.keys(DEFAULT_INITIAL_FORM_DATA);

export const extractMemberFormValues = ({
  member,
}: {
  member?: Member;
}): MemberFormData => {
  if (!member) {
    return { ...DEFAULT_INITIAL_FORM_DATA };
  }

  return MEMBER_FORM_FIELDS.reduce((data, key: string) => {
    data[key] = member[key];
    return data;
  }, {}) as MemberFormData;
};

export const validationSchema = Yup.object({
  firstName: Yup.string().required("Required").min(2, "Too short"),
  lastName: Yup.string().required("Required").min(2, "Too short"),
  dateOfBirth: Yup.string().required("Required"),
  sex: Yup.string().oneOf(["male", "female", "other"]).required("Required"),
  status: Yup.string().oneOf(["ACTIVE", "PAUSED"]).required("Required"),
});
