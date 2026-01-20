import * as Yup from "yup";
import {
  MemberSex,
  MemberStatus,
  type Member,
} from "../../../lib/members/type";
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
    data[key as keyof MemberFormData] = member[key as keyof Member];
    return data;
  }, {} as Partial<MemberFormData>) as MemberFormData;
};

export const validationSchema = Yup.object({
  firstName: Yup.string().required("Required").min(2, "Too short"),
  lastName: Yup.string().required("Required").min(2, "Too short"),
  dateOfBirth: Yup.string()
    .required("Required")
    .test("not-future", "Birthday cannot be in the future", (value) => {
      if (!value) return true;
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate <= today;
    }),
  sex: Yup.string().oneOf(["male", "female", "other"]).required("Required"),
  status: Yup.string().oneOf(["ACTIVE", "PAUSED"]).required("Required"),
});
