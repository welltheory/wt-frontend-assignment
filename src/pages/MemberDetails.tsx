import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Paper,
    Button,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Member } from "../types/member";
import {
    getMember,
    updateMember,
    deleteMember,
    uploadMemberPhoto,
    createMember,
} from "../api/members";
import { MemberForm } from "../components/MemberForm";
import type { MemberFormValues } from "../components/MemberForm";

const EMPTY_VALUES: MemberFormValues = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    sex: "male",
    status: "ACTIVE",
};

export default function MemberDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const isNew = id === "new";

    const [member, setMember] = useState<Member | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Load member for edit mode
    useEffect(() => {
        async function load() {
            if (isNew) {
                setMember(null);
                setLoading(false);
                return;
            }

            if (!id) return;

            const res = await getMember(id);
            if (res.ok) {
                setMember(res.data);
            } else {
                console.error(res.error);
            }
            setLoading(false);
        }

        load();
    }, [id]);

    // Handle form submission (create or update)
    async function handleSubmit(values: MemberFormValues, photoFile: File | null) {
        setSaving(true);

        if (isNew) {
            // Create member
            const res = await createMember(values);

            if (!res.ok) {
                alert(res.error);
                setSaving(false);
                return;
            }

            const newId = res.data.id;

            // Upload photo
            if (photoFile) {
                await uploadMemberPhoto(newId, photoFile);
            }

            navigate(`/members/${newId}`);
            return;
        }

        // Update existing member
        if (!member) return;

        const res = await updateMember(member.id, values);

        if (!res.ok) {
            alert(res.error);
            setSaving(false);
            return;
        }

        if (photoFile) {
            await uploadMemberPhoto(member.id, photoFile);
        }

        alert("Updated successfully");
        setSaving(false);
    }

    async function handleDelete() {
        if (!id || isNew) return;
        const ok = window.confirm("Delete this member?");
        if (!ok) return;

        const res = await deleteMember(id);
        if (res.ok) navigate("/");
        else alert(res.error);
    }

    if (loading) return <p>Loading...</p>;

    const formInitialValues = isNew
        ? EMPTY_VALUES
        : {
            firstName: member!.firstName,
            lastName: member!.lastName,
            dateOfBirth: member!.dateOfBirth,
            sex: member!.sex,
            status: member!.status,
        };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        {isNew ? "Create Member" : "Edit Member"}
                    </Typography>

                    <Button color="inherit" onClick={() => navigate("/members")}>
                        Back
                    </Button>
                </Toolbar>
            </AppBar>

            <Container sx={{ mt: 4 }}>
                <Paper sx={{ p: 3 }}>
                    <MemberForm
                        initialValues={formInitialValues}
                        initialPhotoUrl={member?.photoUrl ?? null}
                        onSubmit={handleSubmit}
                        loading={saving}
                    />

                    {!isNew && (
                        <Button
                            color="error"
                            variant="outlined"
                            sx={{ mt: 2 }}
                            onClick={handleDelete}
                        >
                            Delete Member
                        </Button>
                    )}
                </Paper>
            </Container>
        </>
    );
}
