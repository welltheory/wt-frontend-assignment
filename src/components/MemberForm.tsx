import { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { PhotoUpload } from "./PhotoUpload";

export interface MemberFormValues {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    sex: "male" | "female" | "other";
    status: "ACTIVE" | "PAUSED";
}

interface MemberFormProps {
    initialValues: MemberFormValues;
    initialPhotoUrl?: string | null;
    onSubmit: (values: MemberFormValues, photoFile: File | null) => void | Promise<void>;
    loading?: boolean;
}

export function MemberForm({
    initialValues,
    initialPhotoUrl,
    onSubmit,
    loading = false,
}: MemberFormProps) {
    const [values, setValues] = useState<MemberFormValues>(initialValues);
    const [photoFile, setPhotoFile] = useState<File | null>(null);

    function handleChange(field: keyof MemberFormValues, value: string) {
        setValues((prev) => ({ ...prev, [field]: value }));
    }

    return (
        <Stack spacing={2}>
            <TextField
                label="First Name"
                value={values.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
            />

            <TextField
                label="Last Name"
                value={values.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
            />

            <TextField
                label="Date of Birth"
                type="date"
                value={values.dateOfBirth}
                onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                InputLabelProps={{ shrink: true }}
            />

            <TextField
                select
                SelectProps={{ native: true }}
                label="Sex"
                fullWidth
                value={values.sex}
                onChange={(e) =>
                    handleChange("sex", e.target.value as "male" | "female" | "other")
                }
            >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </TextField>

            <TextField
                select
                SelectProps={{ native: true }}
                label="Status"
                fullWidth
                value={values.status}
                onChange={(e) =>
                    handleChange("status", e.target.value as "ACTIVE" | "PAUSED")
                }
            >
                <option value="ACTIVE">Active</option>
                <option value="PAUSED">Paused</option>
            </TextField>

            <PhotoUpload
                initialUrl={initialPhotoUrl}
                onChange={(file) => setPhotoFile(file)}
            />

            <Button
                variant="contained"
                disabled={loading}
                onClick={() => onSubmit(values, photoFile)}
            >
                Save
            </Button>
        </Stack>
    );
}
