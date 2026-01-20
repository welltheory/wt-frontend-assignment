import { Formik, Form, Field, type FieldProps } from "formik";
import {
  MemberSex,
  MemberStatus,
  type Member,
} from "../../../lib/members/type";
import { extractMemberFormValues, validationSchema } from "./utils";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import type { MemberFormData } from "./types";
import PersonIcon from "@mui/icons-material/Person";

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
    <Card
      sx={{
        width: "min(400px, 100%)",
        margin: "0 auto",
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <CardContent>
        {/* Avatar centered at top */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Avatar
            src={member?.photoUrl || undefined}
            sx={{
              width: 100,
              height: 100,
              mb: 2,
              bgcolor: "primary.main",
              fontSize: "2.5rem",
            }}
          >
            {member?.firstName?.charAt(0) || <PersonIcon fontSize="large" />}
          </Avatar>
          <Typography
            variant="h5"
            component="h2"
            data-testid="member-form-title"
            sx={{ fontWeight: 600 }}
          >
            {formTitle}
          </Typography>
        </Box>

        <Formik {...{ initialValues: formData, validationSchema, onSubmit }}>
          {({ isSubmitting, errors, touched }) => {
            return (
              <Form>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
                >
                  <Field name="firstName">
                    {({ field }: FieldProps) => (
                      <TextField
                        {...field}
                        id="firstName"
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        error={touched.firstName && Boolean(errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                        slotProps={{
                          htmlInput: { "data-testid": "member-form-firstName" },
                          formHelperText: {
                            "data-testid": "member-form-firstName-error",
                          } as Record<string, string>,
                        }}
                      />
                    )}
                  </Field>

                  <Field name="lastName">
                    {({ field }: FieldProps) => (
                      <TextField
                        {...field}
                        id="lastName"
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        error={touched.lastName && Boolean(errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                        slotProps={{
                          htmlInput: { "data-testid": "member-form-lastName" },
                          formHelperText: {
                            "data-testid": "member-form-lastName-error",
                          } as Record<string, string>,
                        }}
                      />
                    )}
                  </Field>

                  <Field name="dateOfBirth">
                    {({ field }: FieldProps) => (
                      <TextField
                        {...field}
                        id="dateOfBirth"
                        label="Date of Birth"
                        type="date"
                        variant="outlined"
                        fullWidth
                        slotProps={{
                          inputLabel: { shrink: true },
                          htmlInput: {
                            "data-testid": "member-form-dateOfBirth",
                            max: new Date().toISOString().split("T")[0],
                          },
                        }}
                        error={
                          touched.dateOfBirth && Boolean(errors.dateOfBirth)
                        }
                        helperText={touched.dateOfBirth && errors.dateOfBirth}
                      />
                    )}
                  </Field>

                  <Field name="sex">
                    {({ field }: FieldProps) => (
                      <FormControl
                        fullWidth
                        error={touched.sex && Boolean(errors.sex)}
                      >
                        <InputLabel id="sex-label">Sex</InputLabel>
                        <Select
                          {...field}
                          labelId="sex-label"
                          id="sex"
                          label="Sex"
                          data-testid="member-form-sex"
                        >
                          <MenuItem value={MemberSex.Male}>Male</MenuItem>
                          <MenuItem value={MemberSex.Female}>Female</MenuItem>
                          <MenuItem value={MemberSex.Other}>Other</MenuItem>
                        </Select>
                        {touched.sex && errors.sex && (
                          <FormHelperText data-testid="member-form-sex-error">
                            {errors.sex}
                          </FormHelperText>
                        )}
                      </FormControl>
                    )}
                  </Field>

                  <Field name="status">
                    {({ field }: FieldProps) => (
                      <FormControl
                        fullWidth
                        error={touched.status && Boolean(errors.status)}
                      >
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select
                          {...field}
                          labelId="status-label"
                          id="status"
                          label="Status"
                          data-testid="member-form-status"
                        >
                          <MenuItem value={MemberStatus.Active}>
                            Active
                          </MenuItem>
                          <MenuItem value={MemberStatus.Paused}>
                            Paused
                          </MenuItem>
                        </Select>
                        {touched.status && errors.status && (
                          <FormHelperText data-testid="member-form-status-error">
                            {errors.status}
                          </FormHelperText>
                        )}
                      </FormControl>
                    )}
                  </Field>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 2,
                      pt: 2,
                      borderTop: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <Button
                      onClick={onCancel}
                      variant="outlined"
                      data-testid="member-form-cancel"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      data-testid="member-form-submit"
                    >
                      {isSubmitting ? "Saving ..." : submitLabel}
                    </Button>
                  </Box>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </CardContent>
    </Card>
  );
};
