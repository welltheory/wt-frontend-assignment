import { Formik, Form, Field, ErrorMessage } from "formik";
import { MemberSex, MemberStatus, type Member } from "../../lib/members/type";
import { extractMemberFormValues, validationSchema } from "./utils";
import styled from "styled-components";
import { Button } from "@mui/material";
import type { MemberFormData } from "./types";

export const MemberForm = ({
  member,
  onSubmit,
  onCancel,
}: {
  member?: Member;
  onSubmit: (values: MemberFormData) => Promise<void>;
  onCancel: () => void;
}) => {
  const isEdit = !!member;
  const formTitle = isEdit ? "Edit Member" : "New Member";

  const formData = extractMemberFormValues({ member });

  const submitLabel = isEdit ? "Update" : "Create";

  return (
    <div>
      <h3>{formTitle}</h3>

      <Formik {...{ initialValues: formData, validationSchema, onSubmit }}>
        {({ isSubmitting }) => {
          return (
            <Form>
              <FormGroup>
                <FormRow>
                  <Label htmlFor="firstName">First Name</Label>
                  <Field as={Input} id="firstName" name="firstName"></Field>
                  <ErrorMessage name="firstName" component={ErrorText} />
                </FormRow>
              </FormGroup>
              <FormGroup>
                <FormRow>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Field as={Input} id="lastName" name="lastName"></Field>
                  <ErrorMessage name="lastName" component={ErrorText} />
                </FormRow>
              </FormGroup>

              <FormGroup>
                <FormRow>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Field
                    as={Input}
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                  ></Field>
                  <ErrorMessage name="dateOfBirth" component={ErrorText} />
                </FormRow>
              </FormGroup>

              <FormGroup>
                <FormRow>
                  <Label htmlFor="sex">Sex</Label>
                  <Field as={Select} id="sex" name="sex">
                    <option value={MemberSex.Male}>Male</option>
                    <option value={MemberSex.Female}>Female</option>
                    <option value={MemberSex.Other}>Other</option>
                  </Field>
                  <ErrorMessage name="sex" component={ErrorText} />
                </FormRow>
              </FormGroup>

              <FormGroup>
                <FormRow>
                  <Label htmlFor="status">Status</Label>
                  <Field as={Select} id="status" name="status">
                    <option value={MemberStatus.Active}>Active</option>
                    <option value={MemberStatus.Paused}>Paused</option>
                  </Field>
                  <ErrorMessage name="status" component={ErrorText} />
                </FormRow>
              </FormGroup>

              <ButtonGroup>
                <Button onClick={onCancel}>Cancel</Button>
                <Button type="submit" variant="contained" color="primary">
                  {isSubmitting ? "Saving ..." : submitLabel}
                </Button>
              </ButtonGroup>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

const FormGroup = styled.div`
  margin-bottom: 1.2rem;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
`;

const Label = styled.label``;

const Input = styled.input``;

const Select = styled.select``;

const ErrorText = styled.div``;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 1rem;
  margin-top: 1rem;
`;
