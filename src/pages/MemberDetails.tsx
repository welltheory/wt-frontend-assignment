import { useParams } from "react-router-dom";
import useSWR from "swr";
import { type Member } from "../lib/members/type";
import { getMemberById, updateMemberBydId } from "../lib/api/fetch";
import { useMemberSwrSyncer } from "../lib/members/hooks/useMemberSwrSyncer";

import { useCallback, useState } from "react";

import { PageHeader } from "../components/PageHeader";

import type { MemberFormData } from "../components/member/memberForm/types";
import { MemberDetailsContent } from "../components/memberDetailsPage/MemberDetailsContent";
import { MemberForm } from "../components/member/memberForm/MemberForm";
import { Alert, Snackbar } from "@mui/material";

export const MemberDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);

  const { id } = useParams<{ id: string }>();
  const { syncMember } = useMemberSwrSyncer();
  const {
    data: member,
    isLoading,
    error,
  } = useSWR<Member | null>(id ? ["member", id] : null, () =>
    getMemberById({ id: id! }),
  );

  const onEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const onCancelEdit = useCallback(() => {
    setIsEditing(false);
  }, []);

  const onSubmitEdit = useCallback(
    async (data: MemberFormData) => {
      const updatedMember = await updateMemberBydId({ id: id!, data });
      syncMember(updatedMember);
      setIsEditing(false);
      setShowSuccessSnackbar(true);
    },
    [id, syncMember],
  );

  const onCloseSnackbar = useCallback(() => {
    setShowSuccessSnackbar(false);
  }, []);

  const onAvatarUpdated = useCallback(
    (photoUrl: string) => {
      if (member) {
        syncMember({ ...member, photoUrl });
      }
    },
    [syncMember, member],
  );

  if (error) {
    return <div>Failed to load that member ...</div>;
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (!member) {
    return <div>Could not find that member ...</div>;
  }

  return (
    <div>
      <PageHeader title="Member" />

      {isEditing ? (
        <MemberForm
          {...{ member, onCancel: onCancelEdit, onSubmit: onSubmitEdit }}
        />
      ) : (
        <MemberDetailsContent {...{ member, onEdit, onAvatarUpdated }} />
      )}

      <Snackbar
        open={showSuccessSnackbar}
        autoHideDuration={4000}
        onClose={onCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={onCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Member updated successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};
