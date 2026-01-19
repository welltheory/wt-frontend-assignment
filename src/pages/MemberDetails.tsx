import { useParams } from "react-router-dom";
import useSWR from "swr";
import { type Member } from "../lib/members/type";
import { getMemberById, updateMemberBydId } from "../lib/api/fetch";

import { useCallback, useState } from "react";

import { PageHeader } from "../components/PageHeader";

import type { MemberFormData } from "../components/memberForm/types";
import { MemberDetailsContent } from "../components/memberDetailsPage/MemberDetailsContent";
import { MemberForm } from "../components/memberForm/MemberForm";

export const MemberDetails = () => {
  const [isEditing, setIsEditing] = useState(false);

  const { id } = useParams<{ id: string }>();
  const {
    data: member,
    isLoading,
    error,
    mutate: reload,
  } = useSWR<Member | null>(id ? `/members/${id}` : null, () =>
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
      return updateMemberBydId({ id: id!, data });
    },
    [id],
  );

  const onAvatarUpdated = useCallback(() => {
    reload();
  }, [reload]);

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
    </div>
  );
};
